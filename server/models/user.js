'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Taste, {
        through: 'User_taste',
        foreignKey: 'user_id',
      });
      this.belongsToMany(models.Card, {
        through: 'User_card',
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      etiquette: DataTypes.STRING,
      oauth: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User',
      timestamps: true,
    }
  );
  return User;
};
