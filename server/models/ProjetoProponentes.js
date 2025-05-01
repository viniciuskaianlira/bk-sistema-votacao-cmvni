import { pool } from '../config/db.js'

class ProjetoProponentes {
  static async create(data) {
    try {
      const { projeto_id, vereador_id } = data;

      const [result] = await pool.query(
        `INSERT INTO projeto_proponentes (projeto_id, vereador_id) VALUES (?, ?)`,
        [projeto_id, vereador_id]
      );

      return { success: true, message: "Proponente adicionado com sucesso." };
    } catch (error) {
      console.error("Erro ao adicionar proponente ao projeto:", error);
      return { success: false, message: "Erro ao adicionar proponente." };
    }
  }

  static async read(projeto_id = null) {
    try {
      let query = `
        SELECT pp.*, v.nome AS vereador_nome
        FROM projeto_proponentes pp
        JOIN vereadores v ON pp.vereador_id = v.id
      `;
      const params = [];

      if (projeto_id) {
        query += " WHERE pp.projeto_id = ?";
        params.push(projeto_id);
      }

      const [result] = await pool.query(query, params);
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar proponentes:", error);
      return { success: false, message: "Erro ao buscar dados." };
    }
  }

  static async delete(projeto_id, vereador_id) {
    try {
      const [result] = await pool.query(
        `DELETE FROM projeto_proponentes WHERE projeto_id = ? AND vereador_id = ?`,
        [projeto_id, vereador_id]
      );

      return result.affectedRows > 0
        ? { success: true, message: "Proponente removido com sucesso." }
        : { success: false, message: "Proponente não encontrado." };
    } catch (error) {
      console.error("Erro ao remover proponente:", error);
      return { success: false, message: "Erro ao remover proponente." };
    }
  }
}

export default ProjetoProponentes;
