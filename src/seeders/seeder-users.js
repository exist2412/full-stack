'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmai.com',
        password: '123456',
        phone: '0779431243',
        firstName: 'Nguyên',
        lastName: 'Nguyễn',
        address: 'Nguyễn Truyền Thanh',
        positionId: 'P1',
        image: '',
        gender: 1,
        roleId: 'R1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
