require('dotenv-flow').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sescSistemas = require('./api/v1/middlewares/consultaSaldoSesc');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res, next) => {
  res.json({
    appName: process.env.APP_NAME,
    environment: process.env.NODE_ENV
  });
});

app.use((req, res, next) => {
  sescSistemas(req, res, next);
});

const VERSIONS = process.env.VERSIONS ? JSON.parse(process.env.VERSIONS) : { "Pre-Release": "v0", "API: Versão 1": "v1" };

app.get("/api/versions", (req, res) => {
  res.json(VERSIONS);
});

for (let key in VERSIONS) {
  require(`./api/${VERSIONS[key]}/router`)(app);
}

module.exports = app;
