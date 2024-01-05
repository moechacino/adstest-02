const express = require("express");
const Router = express.Router();
const {
  createProduct,
  editProduct,
  deleteOneProduct,
} = require("../controllers/products");

Router.route("/create").post(createProduct);
Router.route("/edit/:id").patch(editProduct);
Router.route("/delete/:id").delete(deleteOneProduct);
module.exports = Router;
