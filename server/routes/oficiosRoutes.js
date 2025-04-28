import express from "express";
import oficiosController from "../controllers/oficiosController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para adicionar um ofício
router.post(
  "/oficios",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosController.add
);

// Rota para obter todos os ofícios
router.get(
  "/oficios",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosController.getAll
);

// Rota para obter um ofício por ID
router.get(
  "/oficios/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosController.getById
);

// Rota para remover um ofício
router.delete(
  "/oficios/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  oficiosController.remove
);

export default router;
