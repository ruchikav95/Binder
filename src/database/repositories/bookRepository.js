const models = require('../models');
const SequelizeRepository = require('./sequelizeRepository');
const AuditLogRepository = require('./auditLogRepository');
const FileRepository = require('./fileRepository');
const lodash = require('lodash');
const SequelizeFilterUtils = require('../utils/sequelizeFilterUtils');

const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

/**
 * Handles database operations for the Book.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
class BookRepository {
  /**
   * Creates the Book.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.book.create(
      {
        ...lodash.pick(data, [
          'id',
          'bookName',
          'author',
          'subject',
          'importHash',
          'updatedAt',
          'createdAt',
        ]),
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    await record.setBookOwner(data.bookOwner || [], {
      transaction,
    });



    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the Book.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let record = await models.book.findByPk(id, {
      transaction,
    });

    record = await record.update(
      {
        ...lodash.pick(data, [
          'id',
          'bookName',
          'author',
          'subject',
          'importHash',
          'updatedAt',
          'createdAt',
        ]),
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );


    await record.setBookOwner(data.bookOwner || [], {
      transaction,
    });



    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Deletes the Book.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let record = await models.book.findByPk(id, {
      transaction,
    });

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      null,
      options,
    );
  }

  /**
   * Finds the Book and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [

    ];

    const record = await models.book.findByPk(id, {
      include,
      transaction,
    });

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Counts the number of Books based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return models.book.count(
      {
        where: filter,
      },
      {
        transaction,
      },
    );
  }

  /**
   * Finds the Books based on the query.
   * See https://sequelize.org/v5/manual/querying.html to learn how to
   * customize the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   * @param {Object} [options]
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  async findAndCountAll(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let where = {};
    let include = [

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        };
      }

      if (filter.bookName) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'book',
            'bookName',
            filter.bookName,
          ),
        };
      }

      if (filter.author) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'book',
            'author',
            filter.author,
          ),
        };
      }

      if (filter.subject) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'book',
            'subject',
            filter.subject,
          ),
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start) {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end) {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let {
      rows,
      count,
    } = await models.book.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  /**
   * Lists the Books to populate the autocomplete.
   * See https://sequelize.org/v5/manual/querying.html to learn how to
   * customize the query.
   *
   * @param {string} query
   * @param {number} limit
   */
  async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },
          {
            [Op.and]: SequelizeFilterUtils.ilike(
              'book',
              'bookName',
              query,
            ),
          },
        ],
      };
    }

    const records = await models.book.findAll({
      attributes: ['id', 'bookName'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['bookName', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.bookName,
    }));
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} record - The sequelize record
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  async _createAuditLog(action, record, data, options) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
        bookOwnerIds: data.bookOwner,
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'book',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  /**
   * Fills an array of Book with relations and files.
   *
   * @param {Array} rows
   * @param {Object} [options]
   */
  async _fillWithRelationsAndFilesForRows(rows, options) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  /**
   * Fill the Book with the relations and files.
   *
   * @param {Object} record
   * @param {Object} [options]
   */
  async _fillWithRelationsAndFiles(record, options) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    output.bookOwner = await record.getBookOwner({
      transaction,
    });

    return output;
  }
}

module.exports = BookRepository;
