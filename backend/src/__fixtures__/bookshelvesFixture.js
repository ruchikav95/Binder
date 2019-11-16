const genericFixture = require('./genericFixture');
const BookshelvesRepository = require('../database/repositories/bookshelvesRepository');

const bookshelvesFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new BookshelvesRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = bookshelvesFixture;
