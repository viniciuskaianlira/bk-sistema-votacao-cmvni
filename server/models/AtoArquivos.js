import { pool } from '../config/db.js'

class AtoArquivos {
  static async addArquivo({ ato_id, arquivo_pdf, nome_arquivo }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO ato_arquivos (ato_id, arquivo_pdf, nome_arquivo) VALUES (?, ?, ?)`,
        [ato_id, arquivo_pdf, nome_arquivo]
      );
      return { success: true, message: "Arquivo adicionado com sucesso." };
    } catch (error) {
      console.error("Erro ao adicionar arquivo ao ato:", error);
      return { success: false, message: "Erro ao adicionar arquivo ao ato." };
    }
  }

  static async getArquivosByAto(ato_id) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM ato_arquivos WHERE ato_id = ?`,
        [ato_id]
      );
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar arquivos do ato:", error);
      return { success: false, message: "Erro ao buscar arquivos." };
    }
  }

  static async removeArquivo({ ato_id, id }) {
    try {
      const [result] = await pool.query(
        `DELETE FROM ato_arquivos WHERE ato_id = ? AND id = ?`,
        [ato_id, id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Arquivo não encontrado." };
      }
      return { success: true, message: "Arquivo removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover arquivo:", error);
      return { success: false, message: "Erro ao remover arquivo." };
    }
  }
}

export default AtoArquivos;
