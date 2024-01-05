const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Products = require("./Products");
const ProductAssets = sequelize.define("product_assets", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
  },
});

ProductAssets.belongsTo(Products, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

module.exports = ProductAssets;
