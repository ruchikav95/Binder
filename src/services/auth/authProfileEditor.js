const assert = require('assert');
const UserRepository = require('../../database/repositories/userRepository');
const SequelizeRepository = require('../../database/repositories/sequelizeRepository');

/**
 * Handles the update of the user profile.
 */
module.exports = class AuthProfileEditor {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.transaction = null;
  }

  /**
   * Executes the user update.
   *
   * @param {*} data
   */
  async execute(data) {
    this.data = data;

    await this._validate();

    try {
      this.transaction = await SequelizeRepository.createTransaction();

      await this._loadUser();
      await this._updateAtDatabase();

      await SequelizeRepository.commitTransaction(
        this.transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        this.transaction,
      );
      throw error;
    }
  }

  /**
   * Loads the user.
   */
  async _loadUser() {
    this.user = await UserRepository.findById(
      this.currentUser.id,
      { transaction: this.transaction },
    );
  }

  /**
   * Updates the user at the database.
   */
  async _updateAtDatabase() {
    this.user = await UserRepository.updateProfile(
      this.currentUser.id,
      this.data,
      {
        currentUser: this.currentUser,
        transaction: this.transaction,
      },
    );
  }

  /**
   * Validates the user info.
   */
  async _validate() {
    assert(this.currentUser, 'currentUser is required');
    assert(
      this.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.currentUser.email,
      'currentUser.email is required',
    );

    assert(this.data, 'profile is required');
  }
};
