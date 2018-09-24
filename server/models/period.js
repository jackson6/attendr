'use strict';
module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define('Period', {
    periodId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {});
  Period.associate = function(models) {
    Period.hasMany(models.Class, {
      foreignKey: 'periodId',
      as: 'classrooms',
    });
  };
  return Period;
};