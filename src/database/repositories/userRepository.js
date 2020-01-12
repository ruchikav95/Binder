const SequelizeRepository = require('./sequelizeRepository');
const models = require('../models');
const UserRoleRepository = require('./userRoleRepository');
const FileRepository = require('./fileRepository');
const AuditLogRepository = require('./auditLogRepository');
const crypto = require('crypto');
const SequelizeFilterUtils = require('../utils/sequelizeFilterUtils');

const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

/**
 * Handles database operations for Users.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
module.exports = class UserRepository {
  /**
   * Creates a user.
   */
  static async create(data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.create(
      {
        id: data.id || undefined,
        email: data.email,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        authenticationUid: data.authenticationUid || null,
        phoneNumber: data.phoneNumber || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
        belongsToId: user.id,
      },
      data.avatars,
      options,
    );

    await UserRoleRepository.add(
      user.id,
      data.roles || [],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Creates the user based on the auth information.
   *
   * @param {*} data
   * @param {*} [options]
   */
  static async createFromAuth(data, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.create(
      {
        email: data.email,
        firstName: data.firstName,
        authenticationUid: data.authenticationUid,
        password: data.password,
      },
      { transaction },
    );

    await user.update(
      {
        authenticationUid: user.id,
      },
      { transaction },
    );

    await UserRoleRepository.add(
      user.id,
      data.roles || [],
      options,
    );

    delete user.password;
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Updates the profile of the user.
   *
   * @param {*} id
   * @param {*} data
   * @param {*} [options]
   */
  static async updateProfile(id, data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findByPk(id, {
      transaction,
    });

    await user.update(
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        phoneNumber: data.phoneNumber || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
        belongsToId: user.id,
      },
      data.avatars,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
            options,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Updates the password of the user.
   *
   * @param {*} id
   * @param {*} password
   * @param {*} [options]
   */
  static async updatePassword(id, password, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findByPk(id, {
      transaction,
    });

    await user.update(
      {
        password,
        authenticationUid: id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          authenticationUid: id,
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Generates the email verification token.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async generateEmailVerificationToken(
    email,
    options,
  ) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findOne(
      {
        where: { email },
      },
      {
        transaction,
      },
    );

    const emailVerificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const emailVerificationTokenExpiresAt =
      Date.now() + 360000;

    await user.update(
      {
        emailVerificationToken,
        emailVerificationTokenExpiresAt,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id: user.id,
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
        },
      },
      options,
    );

    return emailVerificationToken;
  }

  /**
   * Generates the password reset token.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async generatePasswordResetToken(email, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findOne(
      {
        where: { email },
      },
      {
        transaction,
      },
    );

    const passwordResetToken = crypto
      .randomBytes(20)
      .toString('hex');
    const passwordResetTokenExpiresAt = Date.now() + 360000;

    await user.update(
      {
        passwordResetToken,
        passwordResetTokenExpiresAt,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id: user.id,
          passwordResetToken,
          passwordResetTokenExpiresAt,
        },
      },
      options,
    );

    return passwordResetToken;
  }

  /**
   * Updates the status of the user: Disabled or Enabled.
   *
   * @param {*} id
   * @param {*} disabled
   * @param {*} [options]
   */
  static async updateStatus(id, disabled, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findByPk(id, {
      transaction,
    });

    await user.update(
      {
        disabled,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          disabled,
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Updates the roles of the user.
   *
   * @param {*} id
   * @param {*} roles
   * @param {*} [options]
   */
  static async updateRoles(id, roles, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findByPk(id, {
      transaction,
    });

    if (options.addRoles) {
      await UserRoleRepository.add(
        user.id,
        roles || [],
        options,
      );
    } else if (options.removeOnlyInformedRoles) {
      await UserRoleRepository.remove(
        user.id,
        roles || [],
        options,
      );
    } else {
      await UserRoleRepository.refresh(
        user.id,
        roles || [],
        options,
      );
    }

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          roles: await UserRoleRepository.findAllByUser(
            user.id,
            options,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Updates a User.
   *
   * @param {*} id
   * @param {*} data
   * @param {*} [options]
   */
  static async update(id, data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findByPk(id, {
      transaction,
    });

    await user.update(
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        phoneNumber: data.phoneNumber || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
        belongsToId: user.id,
      },
      data.avatars,
      options,
    );

    await UserRoleRepository.refresh(
      user.id,
      data.roles || [],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
            options,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  /**
   * Finds the user by email.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async findByEmail(email, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.user.findOne(
      { where: { email } },
      { transaction },
    );

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Find the user by email, but without fetching the avatar.
   *
   * @param {*} email
   * @param {*} [options]
   */
  static async findByEmailWithoutAvatar(email, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.user.findOne(
      { where: { email } },
      { transaction },
    );

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Finds the user based on the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAllWithCount(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let where = {};
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        };
      }

      if (filter.fullName) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'user',
            'fullName',
            filter.fullName,
          ),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'user',
            'email',
            filter.email,
          ),
        };
      }

      if (filter.role) {
        include.push({
          model: models.userRole,
          as: 'roles',
          where: { ['role']: filter.role },
        });
      }

      if (filter.status) {
        const disabled = filter.status === 'disabled';

        where = {
          ...where,
          ['disabled']: disabled,
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start) {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end) {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await models.user.findAndCountAll(
      {
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderBy.split('_')]
          : [['createdAt', 'DESC']],
        transaction,
      },
    );

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  /**
   * Lists the users to populate the autocomplete.
   *
   * @param {Object} query
   * @param {number} limit
   */
  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query.id) },
          SequelizeFilterUtils.ilike(
            'user',
            'fullName',
            query.fullName,
          ),
          SequelizeFilterUtils.ilike(
            'user',
            'email',
            query.email,
          ),
        ],
      };
    }

    const users = await models.user.findAll({
      attributes: ['id', 'fullName', 'email'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['fullName', 'ASC']],
    });

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return users.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  /**
   * Finds the user and all its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async findById(id, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.user.findByPk(id, {
      transaction,
    });

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Finds the user, without fetching the avatar.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async findByIdWithoutAvatar(id, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.user.findByPk(id, {
      transaction,
    });

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Finds the users with the ids and filters based on the disabled flag.
   *
   * @param {*} ids
   * @param {*} disabled
   * @param {*} [options]
   */
  static async findAllByDisabled(ids, disabled, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const users = await models.user.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: ids,
        },
        disabled: !!disabled,
      },
      transaction,
    });

    return users;
  }

  /**
   * Finds the user by the password token if not expired.
   *
   * @param {*} token
   * @param {*} [options]
   */
  static async findByPasswordResetToken(token, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.user.findOne(
      {
        where: {
          passwordResetToken: token,
          passwordResetTokenExpiresAt: {
            [models.Sequelize.Op.gt]: Date.now(),
          },
        },
      },
      { transaction },
    );

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Finds the user by the email verification token if not expired.
   *
   * @param {*} token
   * @param {*} [options]
   */
  static async findByEmailVerificationToken(
    token,
    options,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.user.findOne(
      {
        where: {
          emailVerificationToken: token,
          emailVerificationTokenExpiresAt: {
            [models.Sequelize.Op.gt]: Date.now(),
          },
        },
      },
      { transaction },
    );

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Marks the user email as verified.
   *
   * @param {*} id
   * @param {*} [options]
   */
  static async markEmailVerified(id, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const user = await models.user.findByPk(id, {
      transaction,
    });

    await user.update(
      {
        emailVerified: true,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          emailVerified: true,
        },
      },
      options,
    );

    return true;
  }

  /**
   * Counts the users based on the filter.
   *
   * @param {*} [filter]
   * @param {*} [options]
   */
  static async count(filter, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return models.user.count(
      {
        where: filter,
      },
      { transaction },
    );
  }

  /**
   * Fills the users with the relations and files.
   *
   * @param {*} rows
   * @param {*} [options]
   */
  static async _fillWithRelationsAndFilesForRows(
    rows,
    options,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  /**
   * Fills a user with the relations and files.
   *
   * @param {*} record
   * @param {*} [options]
   */
  static async _fillWithRelationsAndFiles(record, options) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    output.avatars = await record.getAvatars({
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    output.roles = await UserRoleRepository.findAllByUser(
      record.id,
      options,
    );

    return output;
  }
};
