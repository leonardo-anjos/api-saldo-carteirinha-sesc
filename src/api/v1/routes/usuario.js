const controller = require("../controllers/usuario");

module.exports = router => {
  router.post("/login", controller.login);
  router.post("/saldo", controller.getSaldo);
};