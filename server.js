require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8069;
const APP_NAME = process.env.APP_NAME || "CONSULTA SALDO SESC-CE";

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = require("./src/app");

if (cluster.isMaster) {
  console.log("====================================================");
  console.log(`${process.env.APP_NAME} - ${process.env.NODE_ENV}`);
  console.log("====================================================");
  console.log(`${APP_NAME} -> Rodando processador MASTER`);
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `${APP_NAME} -> !!!ATENÇÃO!!!! Worker ${worker.process.pid} morreu: ${code}, e signal: ${signal}`
    );
    console.log(`${APP_NAME} -> Iniciando um novo worker`);
    cluster.fork();
  });
} else {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`${APP_NAME} -> Rodando na porta: ${PORT}`);
    console.log(
      `${APP_NAME} -> Rodando processo ${
      cluster.isMaster ? "master" : "child"
      }!\n`
    );
  });
}
