import ProjetoProponentes from "../models/ProjetoProponentes.js";

class projetoProponentesController {
  static async create(req, res) {
    const resultado = await ProjetoProponentes.create(req.body);
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async read(req, res) {
    const { projeto_id } = req.params;
    const resultado = await ProjetoProponentes.read(projeto_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async delete(req, res) {
    const { projeto_id, vereador_id } = req.params;
    const resultado = await ProjetoProponentes.delete(projeto_id, vereador_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }
}

export default projetoProponentesController;
