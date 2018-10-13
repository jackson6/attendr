'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('Holiday', {
      holidayId: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
      },
      name: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING
}, {});
  Holiday.associate = function(models) {
      Holiday.belongsToMany(models.Period, {
          through: 'HolidayPeriod',
          as: 'holidayPeriod',
          foreignKey: 'holidayId'
      });
  };
  return Holiday;
};