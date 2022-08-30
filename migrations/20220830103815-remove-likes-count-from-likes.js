'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('likes', 'likes');
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.addColumn('likes', 'likes', Sequelize.INTEGER);
  }
};
