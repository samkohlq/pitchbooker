module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Providers", "uid", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Providers", "uid");
  }
};
