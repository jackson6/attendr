'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassStudent = sequelize.define('ClassStudent', {
    classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    studentId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  }, {});
  ClassStudent.associate = function(models) {
    ClassStudent.hasMany(models.Student, { 
      foreignKey: 'studentId',
    });
    ClassStudent.hasMany(models.Class, { 
      foreignKey: 'classId',
    });
  };
  return ClassStudent;
};