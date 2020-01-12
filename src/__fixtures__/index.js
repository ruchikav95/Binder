const userFixture = require('./userFixture');
const usernameFixture = require('./usernameFixture');
const bookFixture = require('./bookFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  username: usernameFixture,
  book: bookFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
