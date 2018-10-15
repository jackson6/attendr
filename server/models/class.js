'use strict';

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    classId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    periodId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    grade: DataTypes.STRING,
    stream: DataTypes.STRING,
  }, {});
  Class.associate = function(models) {
      Class.belongsTo(models.Period, {
          foreignKey: 'periodId',
          as: 'period',
          onDelete: 'CASCADE',
      });
      Class.belongsToMany(models.Student, {
          through: 'ClassStudent',
          as: 'students',
          foreignKey: 'classId'
      });
      Class.belongsToMany(models.User, {
          through: 'ClassTeacher',
          as: 'formTeachers',
          foreignKey: 'classId'
      });
  };
  return Class;
};