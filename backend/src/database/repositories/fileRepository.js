const SequelizeRepository = require('./sequelizeRepository');
const models = require('../models');
const assert = require('assert');

/**
 * Handles database operations for Files.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
module.exports = class FileRepository {
  /**
   * Updates the file list for some record.
   *
   * @param {object} relation - File relation info.
   * @param {object} rawFiles - File List.
   * @param {object} options
   */
  static async replaceRelationFiles(
    relation,
    rawFiles,
    options,
  ) {
    this._validateReplaceRelationFiles(relation, options);
    const files = this._normalizeFiles(rawFiles);

    await this._removeLegacyFiles(relation, files, options);
    await this._addFiles(relation, files, options);
  }

  /**
   * Transforms the files into an array if it's an object.
   *
   * @param {*} rawFiles
   */
  static _normalizeFiles(rawFiles) {
    let files = [];

    if (Array.isArray(rawFiles)) {
      files = rawFiles;
    } else {
      files = rawFiles ? [rawFiles] : [];
    }

    return files;
  }

  /**
   * Validates required data for files.
   *
   * @param {*} relation
   * @param {*} [options]
   */
  static _validateReplaceRelationFiles(relation, options) {
    assert(relation.belongsTo, 'belongsTo is required');
    assert(
      relation.belongsToColumn,
      'belongsToColumn is required',
    );
    assert(relation.belongsToId, 'belongsToId is required');
  }

  /**
   * Filter file ids that already exists on the database.
   *
   * @param {*} files
   */
  static _existingFilesIds(files) {
    return files
      .filter((file) => !file.new)
      .map((file) => file.id);
  }

  /**
   * Creates the new files on the database.
   *
   * @param {*} relation
   * @param {*} files
   * @param {*} [options]
   */
  static async _addFiles(relation, files, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const inexistentFiles = files.filter(
      (file) => !!file.new,
    );

    for (const file of inexistentFiles) {
      await models.file.create(
        {
          belongsTo: relation.belongsTo,
          belongsToColumn: relation.belongsToColumn,
          belongsToId: relation.belongsToId,
          name: file.name,
          sizeInBytes: file.sizeInBytes,
          privateUrl: file.privateUrl,
          publicUrl: file.publicUrl,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        {
          transaction,
        },
      );
    }
  }

  /**
   * Remove files that don't exist on the new list.
   *
   * @param {*} relation
   * @param {*} files
   * @param {*} [options]
   */
  static async _removeLegacyFiles(
    relation,
    files,
    options,
  ) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const filesToDelete = await models.file.findAll({
      where: {
        belongsTo: relation.belongsTo,
        belongsToId: relation.belongsToId,
        belongsToColumn: relation.belongsToColumn,
        id: {
          [models.Sequelize.Op
            .notIn]: this._existingFilesIds(files),
        },
      },
      transaction,
    });

    for (let file of filesToDelete) {
      await file.destroy({
        transaction,
      });
    }
  }
};
