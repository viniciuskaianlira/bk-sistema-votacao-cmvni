import IndicacaoArquivo from "../models/IndicacaoArquivo.js";

class IndicacaoArquivoController {
    static async create(req, res) {
        const { indicacao_id } = req.body;
        const arquivo_pdf = req.file.buffer; // Supondo que o arquivo será enviado no formato multipart/form-data
        const nome_arquivo = req.file.originalname;

        const result = await IndicacaoArquivo.create(indicacao_id, arquivo_pdf, nome_arquivo);
        if (result.success) {
            res.status(201).json({ message: "Arquivo de indicação adicionado com sucesso!", id: result.insertId });
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async read(req, res) {
        const { indicacao_id, id } = req.query;

        const result = await IndicacaoArquivo.read(indicacao_id, id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async visualizar(req, res) {
        try {
          const { id } = req.params;
    
          const resultado = await IndicacaoArquivos.read(id);
    
          if (!resultado.success || resultado.data.length === 0) {
            return res.status(404).json({ success: false, message: "Arquivo não encontrado." });
          }
    
          const arquivo = resultado.data[0];
    
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", `inline; filename="${arquivo.nome_arquivo}"`);
          res.send(arquivo.arquivo_pdf); // envia o binário direto
        } catch (error) {
          console.error("Erro ao visualizar PDF:", error);
          res.status(500).json({ success: false, message: "Erro no servidor." });
        }
      }

    static async delete(req, res) {
        const { id } = req.params;

        const result = await IndicacaoArquivo.delete(id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    }
}

export default IndicacaoArquivoController;
