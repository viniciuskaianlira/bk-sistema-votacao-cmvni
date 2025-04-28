import pool from "../config/db.js";

class TipoAto {
  static async create(tipo) {
    try {
      const [result] = await pool.query(
        "INSERT INTO tipo_ato (tipo) VALUES (?)",
        [tipo]
      );
      return { success: true, message: "Tipo de ato cadastrado com sucesso." };
    } catch (error) {
      console.error("Erro ao cadastrar tipo de ato:", error);
      return { success: false, message: "Erro ao cadastrar tipo de ato." };
    }
  }

  static async read() {
    try {
      const [result] = await pool.query("SELECT * FROM tipo_ato");
      return { success: true, data: result };
    } catch (error) {
      console.error("Erro ao buscar tipos de ato:", error);
      return { success: false, message: "Erro ao buscar tipos de ato." };
    }
  }

  static async update(id, tipo) {
    try {
      const [result] = await pool.query(
        "UPDATE tipo_ato SET tipo = ? WHERE id = ?",
        [tipo, id]
      );
      if (result.affectedRows === 0) {
        return { success: false, message: "Tipo de ato não encontrado." };
      }
      return { success: true, message: "Tipo de ato atualizado com sucesso." };
    } catch (error) {
      console.error("Erro ao atualizar tipo de ato:", error);
      return { success: false, message: "Erro ao atualizar tipo de ato." };
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query("DELETE FROM tipo_ato WHERE id = ?", [
        id,
      ]);
      if (result.affectedRows === 0) {
        return { success: false, message: "Tipo de ato não encontrado." };
      }
      return { success: true, message: "Tipo de ato removido com sucesso." };
    } catch (error) {
      console.error("Erro ao remover tipo de ato:", error);
      return { success: false, message: "Erro ao remover tipo de ato." };
    }
  }
}

export default TipoAto;
