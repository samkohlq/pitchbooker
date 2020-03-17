"use strict";
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define(
    "Provider",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNum: DataTypes.STRING
    },
    {}
  );
  Provider.associate = function(models) {
    Provider.hasMany(models.Pitch);
  };
  return Provider;
};
