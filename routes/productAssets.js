const express = require("express");
const Router = express.Router();
const {
  createAssets,
  deleteOneAssets,
  editAssets,
} = require("../controllers/productAssets");

Router.route("/create").post(createAssets);
Router.route("/delete/:id").delete(deleteOneAssets);
Router.route("/edit/:productId/:assetId").patch(editAssets);

module.exports = Router;
