'use strict';
const { tastes } = require('../seederdata');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = tastes.map((name) => {
      return { name };
    });
    await queryInterface.bulkInsert('Taste', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Taste', null, {});
  },
};
