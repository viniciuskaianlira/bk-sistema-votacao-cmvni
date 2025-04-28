import OficioRecebido from "../models/OficioRecebido.js";

class oficiosRecebidosController {
  static async add(req, res) {
    const { numero, origem, arquivo_pdf, nome_arquivo, oficio_executivo, data_recebimento } = req.body;
    const resultado = await OficioRecebido.addOficioRecebido({ numero, origem, arquivo_pdf, nome_arquivo, oficio_executivo, data_recebimento });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const resultado = await OficioRecebido.getOficioRecebidoById(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async getAll(req, res) {
    const resultado = await OficioRecebido.getAllOficiosRecebidos();
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async remove(req, res) {
    const { id } = req.params;
    const resultado = await OficioRecebido.removeOficioRecebido(id);
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default oficiosRecebidosController;
