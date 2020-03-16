module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Pitches", "name", Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Pitches", "name");
  }
};
