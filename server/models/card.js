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
    }
  }
  Card.init(
    {
      card_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      region: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      headcount: DataTypes.INTEGER,
      restaurant_id: DataTypes.INTEGER,
      chat_title: DataTypes.STRING,
      chat_content: DataTypes.STRING,
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
