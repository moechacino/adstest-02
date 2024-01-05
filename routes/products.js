const express = require("express");
const Router = express.Router();
const {
  createProduct,
  editProduct,
  deleteOneProduct,
  getProducts,
} = require("../controllers/products");

Router.route("/").get(getProducts);
Router.route("/create").post(createProduct);
Router.route("/edit/:id").patch(editProduct);
Router.route("/delete/:id").delete(deleteOneProduct);
module.exports = Router;
