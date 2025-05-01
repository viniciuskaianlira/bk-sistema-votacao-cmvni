import { pool } from '../config/db.js'

class AtoProponentes {
  static async addProponente({ ato_id, vereador_id }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO ato_proponentes (ato_id, vereador_id) VALUES (?, ?)`,
        [ato_id, vereador_id]
      );
      return { success: true, message: "Proponente adicionado com sucesso." };
    } catch (error) {
      console.error("Erro ao adicionar proponente ao ato:", error);
      return { success: false, message: "Erro ao adicionar proponente ao ato." };
    }
  }

  static async getProponentesByAto(ato_id) {
    try {
      const [result] = await pool.query(
        `SELECT v.id, v.nome FROM ato_proponentes ap
         JOIN vereadores v ON ap.vereador_id = v.id
         WHERE ap.ato_id = ?`,
        [ato_id]
      );
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar proponentes:", error);
      return { success: false, message: "Erro ao buscar proponentes." };
    }
  }

  static async removeProponente({ ato_id, vereador_id }) {
    try {
      const [result] = await pool.query(
        `DELETE FROM ato_proponentes WHERE ato_id = ? AND vereador_id = ?`,
        [ato_id, vereador_id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Proponente não encontrado." };
      }
      return { success: true, message: "Proponente removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover proponente:", error);
      return { success: false, message: "Erro ao remover proponente." };
    }
  }
}

export default AtoProponentes;
