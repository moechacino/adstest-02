const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");
const Categories = require("./Categories");
const Products = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
  },
  slug: {
    type: DataTypes.STRING(200),
  },
  price: {
    type: DataTypes.INTEGER,
  },
});
Products.belongsTo(Categories, {
  foreignKey: "Category_id",
  onDelete: "CASCADE",
});

module.exports = Products;
