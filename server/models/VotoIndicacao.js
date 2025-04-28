import pool from "../config/db.js";

class VotoIndicacao {
  // Adicionar voto
  static async addVotoIndicacao({ vereador_id, indicacao_id, voto }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO votos_indicacao (vereador_id, indicacao_id, voto) 
        VALUES (?, ?, ?)`,
        [vereador_id, indicacao_id, voto]
      );
      return { success: true, message: "Voto registrado com sucesso." };
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
      return { success: false, message: "Erro ao registrar voto." };
    }
  }

  // Obter voto por ID de vereador e indicacao
  static async getVotoIndicacaoById({ vereador_id, indicacao_id }) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM votos_indicacao WHERE vereador_id = ? AND indicacao_id = ?`,
        [vereador_id, indicacao_id]
      );
      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Erro ao buscar voto:", error);
      return { success: false, message: "Erro ao buscar voto." };
    }
  }

  // Obter todos os votos de uma indicação
  static async getVotosByIndicacao(indicacao_id) {
    try {
      const [result] = await pool.query(
        `SELECT * FROM votos_indicacao WHERE indicacao_id = ?`,
        [indicacao_id]
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
        `SELECT * FROM votos_indicacao WHERE vereador_id = ?`,
        [vereador_id]
      );
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar votos do vereador:", error);
      return { success: false, message: "Erro ao buscar votos do vereador." };
    }
  }

  // Remover voto de uma indicação
  static async removeVotoIndicacao({ vereador_id, indicacao_id }) {
    try {
      const [result] = await pool.query(
        `DELETE FROM votos_indicacao WHERE vereador_id = ? AND indicacao_id = ?`,
        [vereador_id, indicacao_id]
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

export default VotoIndicacao;
