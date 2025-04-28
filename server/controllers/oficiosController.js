import Oficio from "../models/Oficio.js";

class oficiosController {
  static async add(req, res) {
    const { numero, destino, arquivo_pdf, nome_arquivo, para_executivo, data_recebimento_executivo } = req.body;
    const resultado = await Oficio.addOficio({ numero, destino, arquivo_pdf, nome_arquivo, para_executivo, data_recebimento_executivo });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const resultado = await Oficio.getOficioById(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async getAll(req, res) {
    const resultado = await Oficio.getAllOficios();
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async remove(req, res) {
    const { id } = req.params;
    const resultado = await Oficio.removeOficio(id);
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default oficiosController;