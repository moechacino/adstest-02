require("dotenv").config();
require("express-async-errors");
const express = require("express");
const sequelize = require("./db/sequelize");
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");

const products = require("./routes/products");
const productsAssets = require("./routes/productAssets");
app.use(express.json());

app.use("/api/adstest/product", products);
app.use("/api/adstest/assets", productsAssets);
app.use((req, res) => {
  res.status(404).send("Route doesnt exist");
});
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
    app.listen(port, console.log(`server running in http://localhost:${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
