require("dotenv").config();

const sequelize = require("./db/sequelize");

const Products = require("./models/Products");
const ProductAssets = require("./models/ProductAssets");
const Categories = require("./models/Categories");

const products = require("./insertData/products.json");
const productassets = require("./insertData/productassets.json");
const categories = require("./insertData/categories.json");

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
    await Categories.bulkCreate(categories);
    await Products.bulkCreate(products);
    await ProductAssets.bulkCreate(productassets);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
