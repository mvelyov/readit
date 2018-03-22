'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subreadits', [{
      name: 'Cats',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Dogs',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Avengers',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subreadits', [{
      name: 'Cats',
    }, {
      name: 'Dogs',
    }, {
      name: 'Avengers',
    }]);
  },
};
