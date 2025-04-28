import AtoProponentes from "../models/AtoProponentes.js";

class atoProponentesController {
  static async add(req, res) {
    const { ato_id, vereador_id } = req.body;
    const resultado = await AtoProponentes.addProponente({ ato_id, vereador_id });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async listByAto(req, res) {
    const { ato_id } = req.params;
    const resultado = await AtoProponentes.getProponentesByAto(ato_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async remove(req, res) {
    const { ato_id, vereador_id } = req.body;
    const resultado = await AtoProponentes.removeProponente({ ato_id, vereador_id });
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default atoProponentesController;
