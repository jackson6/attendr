'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClassTeachers', {
      classId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING
      },
      userId: {
          allowNull: false,
          primaryKey: true,
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
    return queryInterface.dropTable('ClassTeachers');
  }
};
