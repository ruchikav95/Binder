const moment = require('moment');

/**
 * Book database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function(sequelize, DataTypes) {
  const book = sequelize.define(
    'book',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bookName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [2, 255],
          notEmpty: true,
        }
      },
      author: {
        type: DataTypes.TEXT,
        validate: {

        }
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
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

  book.associate = (models) => {
    models.book.belongsToMany(models.user, {
      as: 'bookOwner',
      constraints: false,
      through: 'bookBookOwnerUser',
    });



    models.book.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.book.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return book;
};
