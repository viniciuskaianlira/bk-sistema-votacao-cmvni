import pool from "../config/db.js";

class TipoProjeto {
  static async create(tipo_projeto) {
    try {
      const [result] = await pool.query(
        "INSERT INTO tipo_projeto (tipo_projeto) VALUES (?)",
        [tipo_projeto]
      );
      return { success: true, insertId: result.insertId };
    } catch (error) {
      console.error("Erro ao criar tipo de projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async read(id = null) {
    try {
      let query = "SELECT * FROM tipo_projeto";
      const params = [];

      if (id) {
        query += " WHERE id = ?";
        params.push(id);
      }

      const [result] = await pool.query(query, params);
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar tipo de projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async update(id, tipo_projeto) {
    try {
      const [result] = await pool.query(
        "UPDATE tipo_projeto SET tipo_projeto = ? WHERE id = ?",
        [tipo_projeto, id]
      );

      if (result.affectedRows > 0) {
        return { success: true, message: "Tipo de projeto atualizado com sucesso." };
      } else {
        return { success: false, message: "Nenhuma linha afetada." };
      }
    } catch (error) {
      console.error("Erro ao atualizar tipo de projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM tipo_projeto WHERE id = ?", [id]);

      if (result.affectedRows > 0) {
        return { success: true, message: "Tipo de projeto deletado com sucesso." };
      } else {
        return { success: false, message: "Tipo de projeto não encontrado." };
      }
    } catch (error) {
      console.error("Erro ao deletar tipo de projeto:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }
}

export default TipoProjeto;
