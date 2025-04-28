import express from "express";
import oficiosRecebidosController from "../controllers/oficiosRecebidosController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para adicionar um ofício recebido
router.post(
  "/oficios-recebidos",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosRecebidosController.add
);

// Rota para obter todos os ofícios recebidos
router.get(
  "/oficios-recebidos",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosRecebidosController.getAll
);

// Rota para obter um ofício recebido por ID
router.get(
  "/oficios-recebidos/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosRecebidosController.getById
);

// Rota para remover um ofício recebido
router.delete(
  "/oficios-recebidos/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosRecebidosController.remove
);

export default router;