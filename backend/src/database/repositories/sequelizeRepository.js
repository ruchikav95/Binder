const models = require('../models');

/**
 * Abstracts some basic Sequelize operations.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
module.exports = class SequelizeRepository {
  /**
   * Cleans the database.
   */
  static async cleanDatabase() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(
        'Clean database only allowed for test!',
      );
    }

    await models.sequelize.sync({ force: true });
  }

  /**
   * Returns the currentUser if it exists on the options.
   *
   * @param {object} options
   */
  static getCurrentUser(options) {
    return (options && options.currentUser) || { id: null };
  }

  /**
   * Returns the transaction if it exists on the options.
   *
   * @param {object} options
   */
  static getTransaction(options) {
    return (options && options.transaction) || undefined;
  }

  /**
   * Creates a database transaction.
   */
  static async createTransaction() {
    return models.sequelize.transaction();
  }

  /**
   * Commits a database transaction.
   */
  static async commitTransaction(transaction) {
    return transaction.commit();
  }

  /**
   * Rolls back a database transaction.
   */
  static async rollbackTransaction(transaction) {
    return transaction.rollback();
  }
};
