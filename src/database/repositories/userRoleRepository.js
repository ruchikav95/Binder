const SequelizeRepository = require('./sequelizeRepository');
const models = require('../models');

/**
 * Handles database operations for User Roles.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
module.exports = class UserRoleRepository {
  /**
   * Finds roles based on the query.
   */
  static async findAll({ filter, orderBy }) {
    let where = {};

    if (filter) {
      if (filter.role) {
        where = {
          ...where,
          ['role']: filter.role,
        };
      }
    }

    return models.userRole.findAll({
      raw: true,
      where,
      attributes: ['role'],
      group: 'role',
      order: orderBy
        ? [orderBy.split('_')]
        : [['role', 'ASC']],
    });
  }

  /**
   * Finds the roles based on the filter, and fills with the related users.
   */
  static async findAllWithUsers({ filter, orderBy }) {
    const rows = await this.findAll({ filter, orderBy });

    return Promise.all(
      rows.map(async (row) => {
        row.users = await this.findAllUsersByRole(
          row.role,
          null,
        );
        return row;
      }),
    );
  }

  /**
   * Find users by role.
   *
   * @param {*} role
   * @param {*} [options]
   */
  static async findAllUsersByRole(role, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return models.user.findAll(
      {
        include: [
          {
            model: models.userRole,
            as: 'roles',
            where: { role },
          },
        ],
      },
      { transaction },
    );
  }

  /**
   * Finds the roles of the user.
   *
   * @param {*} userId
   * @param {*} [options]
   */
  static async findAllByUser(userId, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const userRoles = await models.userRole.findAll(
      {
        where: {
          userId,
        },
        raw: true,
      },
      { transaction },
    );

    return userRoles.map((userRole) => userRole.role);
  }

  /**
   * Adds a role to the user.
   *
   * @param {*} userId
   * @param {*} roles
   * @param {*} [options]
   */
  static async add(userId, roles, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    for (const role of roles) {
      await models.userRole.findOrCreate({
        where: { userId: userId, role },
        defaults: {
          userId: userId,
          role,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        transaction,
      });
    }
  }

  /**
   * Updates the user roles to match the roles passed.
   *
   * @param {*} userId
   * @param {*} roles
   * @param {*} [options]
   */
  static async refresh(userId, roles, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    await models.userRole.destroy({
      where: {
        userId: userId,
        role: { [models.Sequelize.Op.notIn]: roles },
      },
      transaction,
    });

    for (const role of roles) {
      await models.userRole.findOrCreate({
        where: { userId: userId, role },
        defaults: {
          userId: userId,
          role,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        transaction,
      });
    }
  }

  /**
   * Removes the passed roles from the user.
   *
   * @param {*} userId
   * @param {*} roles
   * @param {*} [options]
   */
  static async remove(userId, roles, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    await models.userRole.destroy({
      where: {
        userId: userId,
        role: { [models.Sequelize.Op.in]: roles },
      },
      transaction,
    });
  }
};
