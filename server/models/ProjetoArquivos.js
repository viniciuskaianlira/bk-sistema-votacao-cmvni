import { pool } from '../config/db.js'

class ProjetoArquivos {
  static async create(data) {
    try {
      const { projeto_id, nome_arquivo, arquivo_pdf } = data;

      const [result] = await pool.query(
        `INSERT INTO projeto_arquivos (projeto_id, nome_arquivo, arquivo_pdf) VALUES (?, ?, ?)`,
        [projeto_id, nome_arquivo, arquivo_pdf]
      );

      return { success: true, message: "Arquivo salvo com sucesso." };
    } catch (error) {
      console.error("Erro ao salvar arquivo do projeto:", error);
      return { success: false, message: "Erro ao salvar o arquivo." };
    }
  }

  static async read(projeto_id) {
    try {
      const [result] = await pool.query(
        `SELECT id, projeto_id, nome_arquivo, data_upload FROM projeto_arquivos WHERE projeto_id = ?`,
        [projeto_id]
      );

      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar arquivos do projeto:", error);
      return { success: false, message: "Erro ao buscar os arquivos." };
    }
  }

  static async download(id) {
    try {
      const [result] = await pool.query(
        `SELECT nome_arquivo, arquivo_pdf FROM projeto_arquivos WHERE id = ?`,
        [id]
      );

      if (result.length === 0) {
        return { success: false, message: "Arquivo não encontrado." };
      }

      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Erro ao buscar arquivo:", error);
      return { success: false, message: "Erro ao buscar o arquivo." };
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM projeto_arquivos WHERE id = ?`,
        [id]
      );

      return result.affectedRows > 0
        ? { success: true, message: "Arquivo removido com sucesso." }
        : { success: false, message: "Arquivo não encontrado." };
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
      return { success: false, message: "Erro ao excluir o arquivo." };
    }
  }
}

export default ProjetoArquivos;