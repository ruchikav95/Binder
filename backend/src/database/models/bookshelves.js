const moment = require('moment');

/**
 * Bookshelves database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function(sequelize, DataTypes) {
  const bookshelves = sequelize.define(
    'bookshelves',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  bookshelves.associate = (models) => {
    models.bookshelves.belongsToMany(models.user, {
      as: 'bsBookName',
      constraints: false,
      through: 'bookshelvesBsBookNameUser',
    });

    models.bookshelves.belongsToMany(models.user, {
      as: 'bsSubjec',
      constraints: false,
      through: 'bookshelvesBsSubjecUser',
    });

    models.bookshelves.belongsToMany(models.user, {
      as: 'bsBookOwner',
      constraints: false,
      through: 'bookshelvesBsBookOwnerUser',
    });



    models.bookshelves.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.bookshelves.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return bookshelves;
};
