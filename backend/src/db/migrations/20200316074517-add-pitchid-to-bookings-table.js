module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Bookings", "PitchId", Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Bookings", "PitchId");
  }
};
