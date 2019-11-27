module.exports = {
  env: 'production',

  /**
   * PostgreSQL configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */
  // database: {
  //   username: 'postgres',
  //   dialect: 'postgres',
  //   password: '',
  //   database: 'postgres',
  //   host: 'postgres',
  //   logging: console.log,
  // },

  /**
   * MySQL configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */
  database: {
    use_env_variable: 'JAWSDB_MARIA_URL',
    dialect: 'mysql',
    username: 'tw4bjjgdss6thjh5',
    password: 'gnygrqlnks1hvgfx',
    database: 'y4jldjwacrqg118b',
    host:
      'lolyz0ok3stvj6f0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: '<place a generated random value here>',

  /**
   * Directory where uploaded files are saved.
   * Default to the storage volume: /storage.
   * See /docker-compose.yml
   */
  // uploadDir: '/storage',

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: '<insert client url here>',
};
