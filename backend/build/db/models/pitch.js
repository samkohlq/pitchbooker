"use strict";

module.exports = function (sequelize, DataTypes) {
  var Pitch = sequelize.define("Pitch", {
    name: DataTypes.STRING,
    pricePerHour: DataTypes.INTEGER,
    address: DataTypes.STRING,
    maxNumPlayersPerSide: DataTypes.INTEGER
  }, {});

  Pitch.associate = function (models) {
    Pitch.belongsTo(models.Provider);
    Pitch.hasMany(models.Booking);
  };

  return Pitch;
};
//# sourceMappingURL=pitch.js.map