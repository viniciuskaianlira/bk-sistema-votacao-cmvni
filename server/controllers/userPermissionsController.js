import UserPermissions from "../models/UserPermissions.js";

class UserPermissionsController {
  // Atribuir um papel a um usuário
  static async assignRole(req, res) {
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        return res.status(400).json({ success: false, message: "Usuário e papel são obrigatórios!" });
      }

      const result = await UserPermissions.assignRoleToUser(userId, roleId);

      if (result.success) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Erro ao atribuir papel:", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor." });
    }
  }

  // Remover um papel de um usuário
  static async removeRole(req, res) {
    try {
      const { userId, roleId } = req.body;

      if (!userId || !roleId) {
        return res.status(400).json({ success: false, message: "Usuário e papel são obrigatórios!" });
      }

      const result = await UserPermissions.removeRoleFromUser(userId, roleId);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Erro ao remover papel:", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor." });
    }
  }

  // Listar os papéis de um usuário
  static async getRoles(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ success: false, message: "Usuário é obrigatório!" });
      }

      const roles = await UserPermissions.getRolesByUserId(userId);

      return res.status(200).json({ success: true, roles });
    } catch (error) {
      console.error("Erro ao buscar papéis do usuário:", error);
      return res.status(500).json({ success: false, message: "Erro interno no servidor." });
    }
  }
}

export default UserPermissionsController;
