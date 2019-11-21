const SequelizeRepository = require('./sequelizeRepository');
const models = require('../models');
const AuditLogRepository = require('./auditLogRepository');

/**
 * Handles database operations for Settings.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
module.exports = class SettingsRepository {
  /**
   * Finds the settings or creates and returns the default.
   *
   * @param {*} defaults
   * @param {*} [options]
   */
  static async findOrCreateDefault(defaults, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const [settings] = await models.settings.findOrCreate({
      where: { id: 'default' },
      defaults: {
        ...defaults,
        id: 'default',
        createdById: currentUser ? currentUser.id : null,
      },
    });

    return settings;
  }

  /**
   * Saves the settings.
   *
   * @param {*} data
   * @param {*} [options]
   */
  static async save(data, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const settings = await this.findOrCreateDefault(
      data,
      options,
    );

    await settings.update(data, {
      transaction,
    });

    await AuditLogRepository.log(
      {
        entityName: 'settings',
        entityId: 'default',
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options,
    );

    return settings;
  }
};
