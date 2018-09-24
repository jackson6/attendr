'use strict';

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    classId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    periodId: {
      type: DataTypes.STRING,
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
  };
  return Class;
};