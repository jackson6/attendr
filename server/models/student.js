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
    Student.belongsToMany(models.Attendance, {
      through: 'Attendance',
      as: 'studentAttendance',
      foreignKey: 'studentId'
    });
  };
  return Student;
};