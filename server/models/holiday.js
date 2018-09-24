'use strict';
module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('Holiday', {
    periodId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Holiday.associate = function(models) {
    Holiday.belongsTo(models.Period, {
      foreignKey: 'periodId',
      as: 'holidays',
      onDelete: 'CASCADE',
    });
  };
  return Holiday;
};