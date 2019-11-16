const SequelizeRepository = require('../database/repositories/sequelizeRepository');
const SettingsRepository = require('../database/repositories/settingsRepository');

const DEFAULT_SETTINGS = {
  id: 'default',
  theme: 'default',
};

/**
 * Handles Settings operations
 */
class SettingsService {
  /**
   * Finds the Settings or creates and returns the default.
   *
   * @param {*} currentUser
   */
  static async findOrCreateDefault(currentUser) {
    return SettingsRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      { currentUser },
    );
  }

  /**
   * Saves the Settings.
   *
   * @param {*} data
   * @param {*} currentUser
   */
  static async save(data, currentUser) {
    const transaction = await SequelizeRepository.createTransaction();

    const settings = await SettingsRepository.save(data, {
      currentUser,
      transaction,
    });

    await SequelizeRepository.commitTransaction(
      transaction,
    );

    return settings;
  }
}

module.exports = SettingsService;
