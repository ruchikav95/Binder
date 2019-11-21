const genericFixture = require('./genericFixture');
const UsernameRepository = require('../database/repositories/usernameRepository');

const usernameFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new UsernameRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = usernameFixture;
