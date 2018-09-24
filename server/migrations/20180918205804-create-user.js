module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      password: {
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
  down: (queryInterface) => queryInterface.dropTable('Users'),
};