'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCompany.belongsTo(models.Product, {foreignKey: 'productId'});
      ProductCompany.belongsTo(models.Company, {foreignKey: 'companyId'});
    }

    static error (err){
      let errArr = [];
      if(err.name === "SequelizeValidationError") {
        for(let i = 0; i < err.errors.length; i++){
            errArr.push(err.errors[i].message);
        }
      }
      return errArr;
    }
    
  };
  ProductCompany.init({
    productId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCompany',
  });
  return ProductCompany;
};