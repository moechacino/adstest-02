const express = require("express");
const Router = express.Router();
const { createAssets } = require("../controllers/productAssets");

Router.route("/create").post(createAssets);

module.exports = Router;
