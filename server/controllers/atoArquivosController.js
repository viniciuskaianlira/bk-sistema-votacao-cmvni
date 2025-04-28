import AtoArquivos from "../models/AtoArquivos.js";

class atoArquivosController {
  static async add(req, res) {
    const { ato_id, arquivo_pdf, nome_arquivo } = req.body;
    const resultado = await AtoArquivos.addArquivo({ ato_id, arquivo_pdf, nome_arquivo });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  static async listByAto(req, res) {
    const { ato_id } = req.params;
    const resultado = await AtoArquivos.getArquivosByAto(ato_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async remove(req, res) {
    const { ato_id, id } = req.body;
    const resultado = await AtoArquivos.removeArquivo({ ato_id, id });
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default atoArquivosController;
