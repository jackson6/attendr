'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HolidayPeriods', {
      periodId: {
	allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      holidayId: {
	allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      startYear: {
          allowNull: false,
          type: Sequelize.STRING
      },
      endYear: {
          allowNull: false,
          type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HolidayPeriods');
  }
};
