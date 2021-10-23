'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: 'User_taste',
        foreignKey: 'taste_id',
      });
    }
  }
  Taste.init(
    {
      taste_id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Taste',
      tableName: 'Taste',
      timestamps: false,
    }
  );
  return Taste;
};
