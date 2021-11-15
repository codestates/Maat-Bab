'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      etiquette: {
        type: Sequelize.STRING,
        defaultValue: '[]',
      },
      oauth: {
        type: Sequelize.STRING,
      },
      certification: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('User');
  },
};
