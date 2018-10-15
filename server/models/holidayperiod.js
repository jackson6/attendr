'use strict';
module.exports = (sequelize, DataTypes) => {
  const HolidayPeriod = sequelize.define('HolidayPeriod', {
    periodId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    holidayId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    startYear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endYear: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {});
  HolidayPeriod.associate = function(models) {
      HolidayPeriod.hasMany(models.Period, {
          foreignKey: 'periodId',
      });
      HolidayPeriod.hasMany(models.Holiday, {
          foreignKey: 'holidayId',
      });
  };
  return HolidayPeriod;
};