const BookshelvesRepository = require('../database/repositories/bookshelvesRepository');
const ValidationError = require('../errors/validationError');
const SequelizeRepository = require('../database/repositories/sequelizeRepository');

/**
 * Handles Bookshelves operations
 */
module.exports = class BookshelvesService {
  constructor({ currentUser, language }) {
    this.repository = new BookshelvesRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  /**
   * Creates a Bookshelves.
   *
   * @param {*} data
   */
  async create(data) {
    const transaction = await SequelizeRepository.createTransaction();

    try {
      const record = await this.repository.create(data, {
        transaction,
        currentUser: this.currentUser,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  /**
   * Updates a Bookshelves.
   *
   * @param {*} id
   * @param {*} data
   */
  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          transaction,
          currentUser: this.currentUser,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  /**
   * Destroy all Bookshelvess with those ids.
   *
   * @param {*} ids
   */
  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction();

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          transaction,
          currentUser: this.currentUser,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  /**
   * Finds the Bookshelves by Id.
   *
   * @param {*} id
   */
  async findById(id) {
    return this.repository.findById(id);
  }

  /**
   * Finds Bookshelvess for Autocomplete.
   *
   * @param {*} search
   * @param {*} limit
   */
  async findAllAutocomplete(search, limit) {
    return this.repository.findAllAutocomplete(
      search,
      limit,
    );
  }

  /**
   * Finds Bookshelvess based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
  }

  /**
   * Imports a list of Bookshelvess.
   *
   * @param {*} data
   * @param {*} importHash
   */
  async import(data, importHash) {
    if (!importHash) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  /**
   * Checks if the import hash already exists.
   * Every item imported has a unique hash.
   *
   * @param {*} importHash
   */
  async _isImportHashExistent(importHash) {
    const count = await this.repository.count({
      importHash,
    });

    return count > 0;
  }
};
