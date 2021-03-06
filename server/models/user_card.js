'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_card extends Model {
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
      this.belongsTo(models.Card, {
        foreignKey: 'card_id',
      });
    }
  }
  User_card.init(
    {
      user_card_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      card_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Card',
          key: 'card_id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'user_id',
        },
      },
      host: DataTypes.BOOLEAN,
      chat_content_idx: DataTypes.INTEGER,
      check_message: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User_card',
      tableName: 'User_card',
      timestamps: false,
    }
  );
  return User_card;
};
