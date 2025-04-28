import Projeto from "../models/Projeto.js";

class projetoController {
  static async create(req, res) {
    const resultado = await Projeto.create(req.body);
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async read(req, res) {
    const { id } = req.params;
    const resultado = await Projeto.read(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async update(req, res) {
    const { id } = req.params;
    const resultado = await Projeto.update(id, req.body);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const resultado = await Projeto.delete(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }
}

export default projetoController;
