'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    classId: DataTypes.STRING,
    studentId: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Attendance.associate = function(models) {
    Attendance.hasMany(models.Student, {
      foreignKey: 'studentId',
      as: 'studentAttendance',
    });
  };
  return Attendance;
};