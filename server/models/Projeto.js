import pool from "../config/db.js";

class Projeto {
  static async create(data) {
    try {
      const {
        numero,
        ementa,
        usuario_id,
        protocolo_id,
        tipo_projeto_id,
        projeto_executivo,
      } = data;

      const [result] = await pool.query(
        `INSERT INTO projeto 
         (numero, ementa, usuario_id, protocolo_id, tipo_projeto_id, projeto_executivo)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [numero, ementa, usuario_id, protocolo_id, tipo_projeto_id, projeto_executivo]
      );

      return { success: true, insertId: result.insertId };
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async read(id = null) {
    try {
      let query = `
        SELECT 
          p.*, 
          u.nome AS usuario_nome,
          tp.tipo_projeto,
          pr.tipo_protocolo
        FROM projeto p
        LEFT JOIN users u ON p.usuario_id = u.id
        LEFT JOIN tipo_projeto tp ON p.tipo_projeto_id = tp.id
        LEFT JOIN protocolo pr ON p.protocolo_id = pr.id
      `;
      const params = [];

      if (id) {
        query += " WHERE p.id = ?";
        params.push(id);
      }

      const [result] = await pool.query(query, params);
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async update(id, data) {
    try {
      const {
        numero,
        ementa,
        usuario_id,
        protocolo_id,
        tipo_projeto_id,
        projeto_executivo,
      } = data;

      const [result] = await pool.query(
        `UPDATE projeto SET
         numero = ?, 
         ementa = ?, 
         usuario_id = ?, 
         protocolo_id = ?, 
         tipo_projeto_id = ?, 
         projeto_executivo = ?
         WHERE id = ?`,
        [numero, ementa, usuario_id, protocolo_id, tipo_projeto_id, projeto_executivo, id]
      );

      return result.affectedRows > 0
        ? { success: true, message: "Projeto atualizado com sucesso." }
        : { success: false, message: "Nenhuma linha afetada." };
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM projeto WHERE id = ?", [id]);
      return result.affectedRows > 0
        ? { success: true, message: "Projeto deletado com sucesso." }
        : { success: false, message: "Projeto não encontrado." };
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }
}

export default Projeto;
