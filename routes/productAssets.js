const express = require("express");
const Router = express.Router();
const {
  createAssets,
  deleteOneAssets,
  editAssets,
  getAssets,
} = require("../controllers/productAssets");

Router.route("/create").post(createAssets);
Router.route("/delete/:id").delete(deleteOneAssets);
Router.route("/edit/:id").patch(editAssets);
Router.route("/").get(getAssets);

module.exports = Router;
