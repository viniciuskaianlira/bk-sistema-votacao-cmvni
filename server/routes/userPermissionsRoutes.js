import express from "express";
import UserPermissionsController from "../controllers/UserPermissionsController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

// 🔹 Atribuir um papel a um usuário (somente administradores)
router.post("/assign-role", authenticate, authorize(["admin"]), UserPermissionsController.assignRole);

// 🔹 Remover um papel de um usuário (somente administradores)
router.post("/remove-role", authenticate, authorize(["admin"]), UserPermissionsController.removeRole);

// 🔹 Listar os papéis de um usuário (somente administradores e o próprio usuário)
router.get("/user-roles/:userId", authenticate, (req, res, next) => {
  const { userId } = req.params;

  // Permite que administradores vejam todas as permissões ou que o próprio usuário veja as suas
  if (req.user.roles.includes("admin") || req.user.id == userId) {
    return UserPermissionsController.getRoles(req, res);
  }

  return res.status(403).json({ success: false, message: "Acesso negado!" });
});

export default router;
