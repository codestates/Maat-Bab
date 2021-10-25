'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Card, {
        foreignKey: 'restaurant_id',
      });
    }
  }
  Restaurant.init(
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      visit: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'Restaurant',
      timestamps: false,
    }
  );
  return Restaurant;
};
