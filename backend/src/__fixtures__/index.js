const userFixture = require('./userFixture');
const usernameFixture = require('./usernameFixture');
const bookFixture = require('./bookFixture');
const bookshelvesFixture = require('./bookshelvesFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  username: usernameFixture,
  book: bookFixture,
  bookshelves: bookshelvesFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
