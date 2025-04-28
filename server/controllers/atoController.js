import Ato from "../models/Ato.js";

class atoController {
  static async create(req, res) {
    const { numero, usuario_id, tipo_ato_id, protocolo_id } = req.body;
    const resultado = await Ato.create({ numero, usuario_id, tipo_ato_id, protocolo_id });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async read(req, res) {
    const resultado = await Ato.read();
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { numero, usuario_id, tipo_ato_id, protocolo_id } = req.body;
    const resultado = await Ato.update(id, { numero, usuario_id, tipo_ato_id, protocolo_id });
    res.status(resultado.success ? 200 : 404).json(resultado);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const resultado = await Ato.delete(id);
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default atoController;
