const { DataTypes } = require("sequelize");
const sequelize = require("../database/index.js");

const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    stravaId: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;