const models = require('../models');
const SequelizeRepository = require('./sequelizeRepository');
const SequelizeFilterUtils = require('../utils/sequelizeFilterUtils');
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

/**
 * Handles database operations for Audit Logs.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
module.exports = class AuditLogRepository {
  static get CREATE() {
    return 'create';
  }
  static get UPDATE() {
    return 'update';
  }
  static get DELETE() {
    return 'delete';
  }

  /**
   * Saves an Audit Log to the database.
   *
   * @param  {Object} log - The log being saved.
   * @param  {string} log.entityName - The name of the entity. Ex.: customer
   * @param  {string} log.entityId - The id of the entity.
   * @param  {string} log.action - The action [create, update or delete].
   * @param  {Object} log.values - The JSON log value with data of the entity.
   *
   * @param  {Object} options
   * @param  {Object} options.transaction - The current database transaction.
   * @param  {Object} options.currentUser - The current logged user.
   */
  static async log(
    { entityName, entityId, action, values },
    options,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const log = await models.auditLog.create(
      {
        entityName,
        entityId,
        action,
        values,
        timestamp: new Date(),
        createdById:
          options && options.currentUser
            ? options.currentUser.id
            : null,
        createdByEmail:
          options && options.currentUser
            ? options.currentUser.email
            : null,
      },
      { transaction },
    );

    return log;
  }

  /**
   * Finds the Audit Logs based on the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAndCountAll({
    filter,
    limit = 0,
    offset = 0,
    orderBy = null,
  }) {
    let where = {};
    let include = [];

    if (filter) {
      if (filter.timestampRange) {
        const [start, end] = filter.timestampRange;

        if (start) {
          where = {
            ...where,
            ['timestamp']: {
              ...where.timestamp,
              [Op.gte]: start,
            },
          };
        }

        if (end) {
          where = {
            ...where,
            ['timestamp']: {
              ...where.timestamp,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.action) {
        where = {
          ...where,
          ['action']: filter.action,
        };
      }

      if (filter.entityId) {
        where = {
          ...where,
          ['entityId']: filter.entityId,
        };
      }

      if (filter.createdByEmail) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'auditLog',
            'createdByEmail',
            filter.createdByEmail,
          ),
        };
      }

      if (filter.entityNames && filter.entityNames.length) {
        where = {
          ...where,
          ['entityName']: {
            [Op.in]: filter.entityNames,
          },
        };
      }
    }

    return models.auditLog.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['timestamp', 'DESC']],
    });
  }
};
