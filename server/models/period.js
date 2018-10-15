'use strict';
module.exports = (sequelize, DataTypes) => {
  const Period = sequelize.define('Period', {
    periodId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      Period.belongsToMany(models.Holiday, {
          through: 'HolidayPeriod',
          as: 'holidays',
          foreignKey: 'periodId'
      });
  };
  return Period;
};