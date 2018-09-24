'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};