const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  matricula: {
    type: String,
    required: [true, "Informe a matricula do usuário"]
  },
  saldosAnteriores: []
}, {
  timestamps: true
});

module.exports = mongoose.model("usuario", usuarioSchema);
