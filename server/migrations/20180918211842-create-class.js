module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Classes', {
      classId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      periodId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.STRING
      },
      stream: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Classes'),
};