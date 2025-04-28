import pool from "../config/db.js";

class Oficio {
  static async addOficio({ numero, destino, arquivo_pdf, nome_arquivo, para_executivo, data_recebimento_executivo }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO oficios (numero, destino, arquivo_pdf, nome_arquivo, para_executivo, data_recebimento_executivo) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [numero, destino, arquivo_pdf, nome_arquivo, para_executivo, data_recebimento_executivo]
      );
      return { success: true, message: "Ofício adicionado com sucesso." };
    } catch (error) {
      console.error("Erro ao adicionar ofício:", error);
      return { success: false, message: "Erro ao adicionar ofício." };
    }
  }

  static async getOficioById(id) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM oficios WHERE id = ?`,
        [id]
      );
      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Erro ao buscar ofício:", error);
      return { success: false, message: "Erro ao buscar ofício." };
    }
  }

  static async getAllOficios() {
    try {
      const [result] = await pool.query(`SELECT * FROM oficios`);
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar ofícios:", error);
      return { success: false, message: "Erro ao buscar ofícios." };
    }
  }

  static async removeOficio(id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM oficios WHERE id = ?`,
        [id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Ofício não encontrado." };
      }
      return { success: true, message: "Ofício removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover ofício:", error);
      return { success: false, message: "Erro ao remover ofício." };
    }
  }
}

export default Oficio;
