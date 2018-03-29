'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subreadits', [{
      name: 'Cats',
      headerImage: 'http://www.localvet.com.au/'+
      'Resources/Web_Templates/t6-riverina/Riverina-A/images/banner-cat.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Dogs',
      headerImage: 'https://data.whicdn.com/images/40648048/original.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Avengers',
      headerImage: 'https://www.disneystore.co.uk/on'+
      '/demandware.static/-/Sites-disneyuk-Library/'+
      'default/dw3ae48820/img/headers/14328-header-avengers-iw.jpg',
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
