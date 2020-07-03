'use strict';
const {
  Model
} = require('sequelize');
const { encrypt } = require('../helpers/encrypt');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

  Admin.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Username cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
    hooks: {
      beforeCreate: (admin) => {
        admin.password = encrypt(admin.password)
      }
    }
  });
  return Admin;
};