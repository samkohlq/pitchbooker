"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Bookings", "PitchId", Sequelize.INTEGER);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Bookings", "PitchId");
  }
};
//# sourceMappingURL=20200316074517-add-pitchid-to-bookings-table.js.map