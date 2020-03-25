"strict mode";

const express = require("express");

require("./config/database/mongo");
require("./config/server");

module.exports = app => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("API v1 - Produção");
  });

  require("./routes/usuario")(router);

  app.use("/api/v1", router);
};
