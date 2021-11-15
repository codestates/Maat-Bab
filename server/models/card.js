'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: 'User_card',
        foreignKey: 'card_id',
      });
      this.hasMany(models.User_card, {
        foreignKey: 'card_id',
      });
      this.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_name',
      });
    }
  }
  Card.init(
    {
      card_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      region: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      headcount: DataTypes.INTEGER,
      restaurant_name: {
        type: DataTypes.STRING,
        references: {
          model: 'Restaurant',
          key: 'restaurant_name',
        },
      },
      chat_title: DataTypes.STRING,
      chat_content: DataTypes.TEXT('long'),
    },
    {
      sequelize,
      modelName: 'Card',
      tableName: 'Card',
      timestamps: true,
    }
  );
  return Card;
};
