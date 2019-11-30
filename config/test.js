const os = require('os');

module.exports = {
  env: 'test',

  /**
   * SQLite in memory configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */
  database: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: '<place a generated random value here>',

  /**
   * Directory where uploaded files are saved.
   * Default to temp.
   */
  uploadDir: os.tmpdir(),

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    auth: {
      user: 'mock',
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: null,

  /**
   * When this email is set, all requests will automatically authenticate using this email.
   * Leave null for test environment.
   */
  userAutoAuthenticatedEmailForTests: null,


};
