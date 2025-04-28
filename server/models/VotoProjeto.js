import pool from "../config/db.js";

class VotoProjeto {
  // Adicionar voto
  static async addVotoProjeto({ vereador_id, projeto_id, voto }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO votos_projeto (vereador_id, projeto_id, voto) 
        VALUES (?, ?, ?)`,
        [vereador_id, projeto_id, voto]
      );
      return { success: true, message: "Voto registrado com sucesso." };
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
      return { success: false, message: "Erro ao registrar voto." };
    }
  }

  // Obter voto por ID de vereador e projeto
  static async getVotoProjetoById({ vereador_id, projeto_id }) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM votos_projeto WHERE vereador_id = ? AND projeto_id = ?`,
        [vereador_id, projeto_id]
      );
      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Erro ao buscar voto:", error);
      return { success: false, message: "Erro ao buscar voto." };
    }
  }

  // Obter todos os votos de um projeto
  static async getVotosByProjeto(projeto_id) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM votos_projeto WHERE projeto_id = ?`,
        [projeto_id]
      );
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar votos:", error);
      return { success: false, message: "Erro ao buscar votos." };
    }
  }

  // Obter todos os votos de um vereador
  static async getVotosByVereador(vereador_id) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM votos_projeto WHERE vereador_id = ?`,
        [vereador_id]
      );
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar votos do vereador:", error);
      return { success: false, message: "Erro ao buscar votos do vereador." };
    }
  }

  // Remover voto de um projeto
  static async removeVotoProjeto({ vereador_id, projeto_id }) {
    try {
      const [result] = await pool.query(
        `DELETE FROM votos_projeto WHERE vereador_id = ? AND projeto_id = ?`,
        [vereador_id, projeto_id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Voto não encontrado." };
      }
      return { success: true, message: "Voto removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover voto:", error);
      return { success: false, message: "Erro ao remover voto." };
    }
  }
}

export default VotoProjeto;
