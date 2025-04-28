import pool from "../config/db.js";

class Ato {
  static async create({ numero, usuario_id, tipo_ato_id, protocolo_id }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO ato (numero, usuario_id, tipo_ato_id, protocolo_id)
         VALUES (?, ?, ?, ?)`,
        [numero, usuario_id, tipo_ato_id, protocolo_id]
      );
      return { success: true, message: "Ato cadastrado com sucesso." };
    } catch (error) {
      console.error("Erro ao cadastrar ato:", error);
      return { success: false, message: "Erro ao cadastrar ato." };
    }
  }

  static async read() {
    try {
      const [result] = await pool.query(`
        SELECT ato.*, u.nome as usuario_nome, tp.tipo as tipo_ato, p.tipo_protocolo
        FROM ato
        JOIN users u ON ato.usuario_id = u.id
        JOIN tipo_ato tp ON ato.tipo_ato_id = tp.id
        JOIN protocolo p ON ato.protocolo_id = p.id
      `);
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar atos:", error);
      return { success: false, message: "Erro ao buscar atos." };
    }
  }

  static async update(id, { numero, usuario_id, tipo_ato_id, protocolo_id }) {
    try {
      const [result] = await pool.query(
        `UPDATE ato
         SET numero = ?, usuario_id = ?, tipo_ato_id = ?, protocolo_id = ?
         WHERE id = ?`,
        [numero, usuario_id, tipo_ato_id, protocolo_id, id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Ato não encontrado." };
      }
      return { success: true, message: "Ato atualizado com sucesso." };
    } catch (error) {
      console.error("Erro ao atualizar ato:", error);
      return { success: false, message: "Erro ao atualizar ato." };
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM ato WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        return { success: false, message: "Ato não encontrado." };
      }
      return { success: true, message: "Ato removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover ato:", error);
      return { success: false, message: "Erro ao remover ato." };
    }
  }
}

export default Ato;
