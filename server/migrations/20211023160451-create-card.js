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
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
      },
      headcount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      restaurant_name: {
        type: Sequelize.STRING,
      },
      chat_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chat_content: {
        type: Sequelize.TEXT('long'),
      },
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Card');
  },
};
