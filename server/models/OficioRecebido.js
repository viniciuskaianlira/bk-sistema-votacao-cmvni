import pool from "../config/db.js";

class OficioRecebido {
  static async addOficioRecebido({ numero, origem, arquivo_pdf, nome_arquivo, oficio_executivo, data_recebimento }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO oficios_recebidos (numero, origem, arquivo_pdf, nome_arquivo, oficio_executivo, data_recebimento) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [numero, origem, arquivo_pdf, nome_arquivo, oficio_executivo, data_recebimento]
      );
      return { success: true, message: "Ofício recebido adicionado com sucesso." };
    } catch (error) {
      console.error("Erro ao adicionar ofício recebido:", error);
      return { success: false, message: "Erro ao adicionar ofício recebido." };
    }
  }

  static async getOficioRecebidoById(id) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM oficios_recebidos WHERE id = ?`,
        [id]
      );
      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Erro ao buscar ofício recebido:", error);
      return { success: false, message: "Erro ao buscar ofício recebido." };
    }
  }

  static async getAllOficiosRecebidos() {
    try {
      const [result] = await pool.query(`SELECT * FROM oficios_recebidos`);
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar ofícios recebidos:", error);
      return { success: false, message: "Erro ao buscar ofícios recebidos." };
    }
  }

  static async removeOficioRecebido(id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM oficios_recebidos WHERE id = ?`,
        [id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Ofício recebido não encontrado." };
      }
      return { success: true, message: "Ofício recebido removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover ofício recebido:", error);
      return { success: false, message: "Erro ao remover ofício recebido." };
    }
  }
}

export default OficioRecebido;
