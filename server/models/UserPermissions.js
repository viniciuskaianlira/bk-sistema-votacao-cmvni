import pool from "../config/db.js";

class UserPermissions {
  // Método para associar um usuário a um papel (role)
  static async assignRoleToUser(userId, roleId) {
    try {
      const [result] = await pool.query(
        "INSERT INTO user_permissions (user_id, role_id) VALUES (?, ?)",
        [userId, roleId]
      );

      if (result.affectedRows > 0) {
        return { success: true, message: "Papel atribuído com sucesso!" };
      } else {
        return { success: false, message: "Falha ao atribuir papel." };
      }
    } catch (error) {
      console.error("Erro ao atribuir papel:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  // Método para remover um papel de um usuário
  static async removeRoleFromUser(userId, roleId) {
    try {
      const [result] = await pool.query(
        "DELETE FROM user_permissions WHERE user_id = ? AND role_id = ?",
        [userId, roleId]
      );

      if (result.affectedRows > 0) {
        return { success: true, message: "Papel removido com sucesso!" };
      } else {
        return { success: false, message: "Papel não encontrado ou não atribuído." };
      }
    } catch (error) {
      console.error("Erro ao remover papel:", error);
      return { success: false, message: "Erro no servidor." };
    }
  }

  // Método para verificar os papéis de um usuário
  static async getRolesByUserId(userId) {
    try {
      const [rows] = await pool.query(
        "SELECT r.id, r.nome FROM roles r JOIN user_permissions up ON r.id = up.role_id WHERE up.user_id = ?",
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Erro ao buscar papéis do usuário:", error);
      return [];
    }
  }
}

export default UserPermissions;
