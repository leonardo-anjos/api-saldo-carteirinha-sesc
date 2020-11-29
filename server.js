require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = require("./src/app");

if (cluster.isMaster) {
  console.log("====================================================");
  console.log(`${process.env.APP_NAME} - ${process.env.NODE_ENV}`);
  console.log("====================================================");
  console.log(`${process.env.APP_NAME} -> Rodando processador MASTER`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `${process.env.APP_NAME} -> !!!ATENÇÃO!!!! Worker ${worker.process.pid} morreu: ${code}, e signal: ${signal}`
    );
    console.log(`${process.env.APP_NAME} -> Iniciando um novo worker`);
    cluster.fork();
  });
} else {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`${process.env.APP_NAME} -> Rodando na porta: ${process.env.PORT}`);
    console.log(
      `${process.env.APP_NAME} -> Rodando processo ${
      cluster.isMaster ? "master" : "child"
      }!\n`
    );
  });
}
