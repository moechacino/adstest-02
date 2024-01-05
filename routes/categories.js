const express = require("express");
const Router = express.Router();

const {
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categories");

Router.route("/create").post(createCategory);
Router.route("/edit/:id").patch(editCategory);
Router.route("/delete/:id").delete(deleteCategory);

module.exports = Router;
