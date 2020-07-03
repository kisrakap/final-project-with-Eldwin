'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductCompany, {foreignKey: 'productId'});
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
    
    fullname(){
      return `${this.type} ${this.name}`;
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `name cannot be empty`
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `type cannot be empty`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: `price must in number`
        },
        notEmpty: {
          msg: `price cannot be empty`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `stock must in rounded number`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeValidate: (data, option) => {
        let name = data.name;
        console.log(name);
        let newFormated = '';
        for(let i = 0; i < name.length; i++){
          if(i === 0){
            newFormated += name[i].toUpperCase();
          } else if (name[i-1] === " "){
            newFormated += name[i].toUpperCase();
          } else {
            newFormated += name[i];
          }
        }
        data.name = newFormated;
      }
    }
  });
  return Product;
};