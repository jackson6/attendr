'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    studentId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Class, {
      through: 'ClassStudent',
      as: 'classes',
      foreignKey: 'studentId'
    });
  };
  return Student;
};