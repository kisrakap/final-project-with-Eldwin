'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.ProductCompany, {foreignKey: 'companyId'});
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
  Company.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Name cannot be empty`
        }
      }
    },
    store: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Store cannot be empty`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};