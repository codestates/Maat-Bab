'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Card', {
      card_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      region: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      headcount: {
        type: Sequelize.INTEGER,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
      },
      chat_title: {
        type: Sequelize.STRING,
      },
      chat_content: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Card');
  },
};
