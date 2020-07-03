'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let brandList = JSON.parse(fs.readFileSync('brands.json', 'utf-8'));

    for (let i = 0; i < brandList.length; i++){
      brandList[i].createdAt = new Date();
      brandList[i].updatedAt = new Date();
    }
    
    return queryInterface.bulkInsert('Companies', brandList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
