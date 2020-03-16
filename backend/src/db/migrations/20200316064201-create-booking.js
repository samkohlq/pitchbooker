'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookerName: {
        type: Sequelize.STRING
      },
      bookerEmail: {
        type: Sequelize.STRING
      },
      bookerPhoneNum: {
        type: Sequelize.STRING
      },
      bookingStartDateTime: {
        type: Sequelize.DATE
      },
      bookingEndDateTime: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Bookings');
  }
};