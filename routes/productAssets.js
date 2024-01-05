const express = require("express");
const Router = express.Router();
const {
  createAssets,
  deleteOneAssets,
} = require("../controllers/productAssets");

Router.route("/create").post(createAssets);
Router.route("/delete/:id").delete(deleteOneAssets);

module.exports = Router;
