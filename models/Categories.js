const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Categories = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
});

module.exports = Categories;
