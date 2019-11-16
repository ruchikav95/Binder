const validator = require('validator');
const uuid = require('uuid/v4');
const Sequelize = require('../models').Sequelize;

/**
 * Utilities to use on Sequelize queries.
 */
module.exports = class SequelizeFilterUtils {
  /**
   * If you pass an invalid uuid to a query, it throws an exception.
   * To hack this behaviour, if the uuid is invalid, it creates a new one,
   * that won't match any of the database.
   * If the uuid is invalid, brings no results.
   *
   * @param {*} value
   */
  static uuid(value) {
    let id = value;

    // If ID is invalid, sequelize throws an error.
    // For that not to happen, if the UUID is invalid, it sets
    // some random uuid
    if (!validator.isUUID(id)) {
      id = uuid();
    }

    return id;
  }

  /**
   * Creates an ilike condition.
   *
   * @param {*} model
   * @param {*} column
   * @param {*} value
   */
  static ilike(model, column, value) {
    return Sequelize.where(
      Sequelize.fn(
        'lower',
        Sequelize.col(`${model}.${column}`),
      ),
      {
        [Sequelize.Op.like]: `%${value}%`.toLowerCase(),
      },
    );
  }
};
