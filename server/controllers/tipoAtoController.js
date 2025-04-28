import TipoAto from "../models/TipoAto.js";

class tipoAtoController {
  static async create(req, res) {
    const { tipo } = req.body;
    const resultado = await TipoAto.create(tipo);
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async read(req, res) {
    const resultado = await TipoAto.read();
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { tipo } = req.body;
    const resultado = await TipoAto.update(id, tipo);
    res.status(resultado.success ? 200 : 404).json(resultado);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const resultado = await TipoAto.delete(id);
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default tipoAtoController;
