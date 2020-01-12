const SequelizeRepository = require('../../database/repositories/sequelizeRepository');
const UserRepository = require('../../database/repositories/userRepository');
const assert = require('assert');
const ValidationError = require('../../errors/validationError');

/**
 * Handles changing the status (enabled/disabeld) of the Users.
 */
module.exports = class IamStatusChanger {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;
    this.transaction = null;
  }

  async changeStatus(data) {
    this.data = data;

    await this._validate();

    try {
      this.transaction = await SequelizeRepository.createTransaction();

      await this._loadUsers();
      await this._changeAtDatabase();
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

  get _ids() {
    if (this.data.ids && !Array.isArray(this.data.ids)) {
      return [this.data.ids];
    } else {
      const uniqueIds = [...new Set(this.data.ids)];
      return uniqueIds;
    }
  }

  get _disabled() {
    return !!this.data.disabled;
  }

  async _loadUsers() {
    this.users = await UserRepository.findAllByDisabled(
      this._ids,
      !this._disabled,
      { transaction: this.transaction },
    );
  }

  async _changeAtDatabase() {
    for (const user of this.users) {
      await UserRepository.updateStatus(
        user.id,
        this._disabled,
        {
          transaction: this.transaction,
          currentUser: this.currentUser,
        },
      );
    }
  }

  async _isDisablingHimself() {
    return (
      this._disabled &&
      this._ids.includes(this.currentUser.id)
    );
  }

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

    assert(
      this._ids && this._ids.length,
      'ids is required',
    );

    if (await this._isDisablingHimself()) {
      throw new ValidationError(
        this.language,
        'iam.errors.disablingHimself',
      );
    }
  }
};
