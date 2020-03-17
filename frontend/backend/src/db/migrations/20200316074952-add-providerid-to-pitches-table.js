module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Pitches", "ProviderId", Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Pitches", "ProviderId");
  }
};
