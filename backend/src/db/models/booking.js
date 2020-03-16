"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      bookerName: DataTypes.STRING,
      bookerEmail: DataTypes.STRING,
      bookerPhoneNum: DataTypes.STRING,
      bookingStartDateTime: DataTypes.DATE,
      bookingEndDateTime: DataTypes.DATE
    },
    {}
  );
  Booking.associate = function(models) {
    Booking.belongsTo(models.Pitch);
  };
  return Booking;
};
