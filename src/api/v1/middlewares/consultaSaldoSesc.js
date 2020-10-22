require('dotenv-flow').config();

const axios = require("axios");
const qs = require("querystring");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async function (req, res, next) {

  const requestBody = {
    matricula: req.body.matricula
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  if (req.url === '/api/v1/login' || req.url === '/api/v1/saldo') {
    await axios.post(process.env.SISTEMA_SESC, qs.stringify(requestBody), config)
      .then(result => {
        try {
          const dom = new JSDOM(`${result.data}`);

          let saldo = dom.window.document.getElementById("saldo").textContent;

          let formatNumber = saldo.replace("R$ ", "");
          let convertToNumber = formatNumber.replace(",", ".");

          res.locals.usuario = req.body;
          res.locals.saldoAtual = convertToNumber;

          next();
        } catch (error) {
          return res.json({ message: "Cliente não encontrado.", status: 400 });
        }
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    next();
  }

};