'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_taste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(models.Taste, {
        foreignKey: 'taste_id',
      });
    }
  }
  User_taste.init(
    {
      user_taste_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'user_id',
        },
      },
      taste_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Taste',
          key: 'taste_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User_taste',
      tableName: 'User_taste',
      timestamps: false,
    }
  );
  return User_taste;
};
