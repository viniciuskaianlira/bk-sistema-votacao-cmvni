import { pool } from '../config/db.js'
import bcrypt from "bcrypt";

class User {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  }

  static async create(nome, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash seguro
    const [result] = await pool.query(
      "INSERT INTO users (nome, username, password) VALUES (?, ?, ?)", 
      [nome, username, hashedPassword]
    );
    return result.insertId;
  }

  static async userExists(username) {
    const [rows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
    return rows.length > 0;
  }

  static async update(id, nome, username, password = null) {
    try {
      // 🔍 Verifica se o username já está em uso por outro usuário
      const [existingUser] = await pool.query(
        "SELECT id FROM users WHERE username = ? AND id <> ?",
        [username, id]
      );

      if (existingUser.length > 0) {
        return { success: false, message: "Username já está em uso!" };
      }

      // 📌 Monta a query de atualização
      let query = "UPDATE users SET nome = ?, username = ?";
      let values = [nome, username];

      // 🔐 Se a senha for informada, criptografa e adiciona à query
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += ", password = ?";
        values.push(hashedPassword);
      }

      query += " WHERE id = ?";
      values.push(id);

      const [result] = await pool.query(query, values);

      if (result.affectedRows > 0) {
        return { success: true, message: "Usuário atualizado com sucesso!" };
      } else {
        return { success: false, message: "Nenhuma alteração feita." };
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  static async deactivate(id) {
    try {
      const [result] = await pool.query(
        "UPDATE users SET ativo = FALSE WHERE id = ?",
        [id]
      );

      if (result.affectedRows > 0) {
        return { success: true, message: "Usuário desativado com sucesso!" };
      } else {
        return { success: false, message: "Usuário não encontrado ou já desativado." };
      }
    } catch (error) {
      console.error("Erro ao desativar usuário:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }
}

export default User;
