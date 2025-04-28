import ProjetoArquivos from "../models/ProjetoArquivos.js";

class projetoArquivosController {
  static async create(req, res) {
    try {
      const { projeto_id } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ success: false, message: "Arquivo não enviado." });
      }

      const resultado = await ProjetoArquivos.create({
        projeto_id,
        nome_arquivo: file.originalname,
        arquivo_pdf: file.buffer,
      });

      res.status(resultado.success ? 201 : 500).json(resultado);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao processar requisição." });
    }
  }

  static async read(req, res) {
    const { projeto_id } = req.params;
    const resultado = await ProjetoArquivos.read(projeto_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  static async download(req, res) {
    const { id } = req.params;
    const resultado = await ProjetoArquivos.download(id);

    if (!resultado.success) {
      return res.status(404).json(resultado);
    }

    res.setHeader("Content-Disposition", `inline; filename="${resultado.data.nome_arquivo}"`);
    res.setHeader("Content-Type", "application/pdf");
    res.send(resultado.data.arquivo_pdf);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const resultado = await ProjetoArquivos.delete(id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }
}

export default projetoArquivosController;