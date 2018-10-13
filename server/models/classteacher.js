'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassTeacher = sequelize.define('ClassTeacher', {
    classId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }
  }, {});
  ClassTeacher.associate = function(models) {
      ClassTeacher.hasMany(models.User, {
          foreignKey: 'userId',
      });
      ClassTeacher.hasMany(models.Class, {
          foreignKey: 'classId',
      });
  };
  return ClassTeacher;
};
