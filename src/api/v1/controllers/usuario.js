require("dotenv").config();
const usuarioSchema = require("../models/usuario");

class UsuarioController {

  async login(req, res) {
    const saldo = Number(res.locals.saldoAtual);
    const matricula = res.locals.usuario.matricula;

    let user = await usuarioSchema.findOne({ matricula: matricula });

    if (user) {
      return res.json(user);
    } else {
      const newUser = await usuarioSchema.create({
        matricula: matricula,
        saldosAnteriores: { saldo: saldo, dataTransacao: new Date(Date.now()) }
      });
      return res.json(newUser)
    }
  }

  async getSaldo(req, res) {
    const saldo = Number(res.locals.saldoAtual);
    const matricula = res.locals.usuario.matricula;

    let user = await usuarioSchema.findOneAndUpdate({ matricula: matricula });

    let resumo = {
      saldo: 35.00,
      dataTransacao: user.updatedAt
    }

    user.saldosAnteriores.push(resumo);

    await user.save();

    return res.json(user);
  }

}

module.exports = new UsuarioController();
