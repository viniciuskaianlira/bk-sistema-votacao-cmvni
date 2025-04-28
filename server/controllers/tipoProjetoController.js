import TipoProjeto from "../models/TipoProjeto.js";

class tipoProjetoController {
  static async create(req, res) {
    const { tipo_projeto } = req.body;
    const resultado = await TipoProjeto.create(tipo_projeto);
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async read(req, res) {
    const { id } = req.params;
    const resultado = await TipoProjeto.read(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { tipo_projeto } = req.body;
    const resultado = await TipoProjeto.update(id, tipo_projeto);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const resultado = await TipoProjeto.delete(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }
}

export default tipoProjetoController;
