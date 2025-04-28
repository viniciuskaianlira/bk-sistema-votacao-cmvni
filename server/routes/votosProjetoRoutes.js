import express from "express";
import votosProjetoController from "../controllers/votosProjetoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para registrar um voto
router.post(
  "/votos-projeto",
  authenticate,
  authorize(["admin", 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']),
  votosProjetoController.add
);

// Rota para obter voto de um vereador para um projeto específico
router.get(
  "/votos-projeto/:vereador_id/:projeto_id",
  authenticate,
  authorize(["admin", "servidor"]),
  votosProjetoController.getById
);

// Rota para obter todos os votos de um projeto
router.get(
  "/votos-projeto/projeto/:projeto_id",
  authenticate,
  authorize(["admin", "servidor"]),
  votosProjetoController.getVotosByProjeto
);

// Rota para obter todos os votos de um vereador
router.get(
  "/votos-projeto/vereador/:vereador_id",
  authenticate,
  authorize(["admin", "servidor"]),
  votosProjetoController.getVotosByVereador
);

// Rota para remover voto de um vereador em um projeto
router.delete(
  "/votos-projeto/:vereador_id/:projeto_id",
  authenticate,
  authorize(["admin"]),
  votosProjetoController.remove
);

export default router;
