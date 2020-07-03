'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let productList = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

    for (let i = 0; i < productList.length; i++){
      productList[i].createdAt = new Date();
      productList[i].updatedAt = new Date();
    }
    
    return queryInterface.bulkInsert('Products', productList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', productList, {});
  }
};
