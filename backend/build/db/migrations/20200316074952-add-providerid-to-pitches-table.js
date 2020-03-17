"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Pitches", "ProviderId", Sequelize.INTEGER);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Pitches", "ProviderId");
  }
};
//# sourceMappingURL=20200316074952-add-providerid-to-pitches-table.js.map