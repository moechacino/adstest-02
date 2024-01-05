require("dotenv").config();
const Sequelize = require("sequelize");
const PG_DBNAME = process.env.PG_DBNAME;
const PG_USERNAME = process.env.PG_USERNAME;
const PG_PASSWORD = process.env.PG_PASSWORD;
const sequelize = new Sequelize(PG_DBNAME, PG_USERNAME, PG_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
