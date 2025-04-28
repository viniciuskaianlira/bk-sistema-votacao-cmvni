import express from "express";
import votosIndicacaoController from "../controllers/votosIndicacaoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para registrar um voto
router.post(
  "/votos-indicacao",
  authenticate,
  authorize(["admin", 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']),
  votosIndicacaoController.add
);

// Rota para obter voto de um vereador para uma indicação específica
router.get(
  "/votos-indicacao/:vereador_id/:indicacao_id",
  authenticate,
  authorize(["admin", "servidor", 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']),
  votosIndicacaoController.getById
);

// Rota para obter todos os votos de uma indicação
router.get(
  "/votos-indicacao/indicacao/:indicacao_id",
  authenticate,
  authorize(["admin", "servidor", 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']),
  votosIndicacaoController.getVotosByIndicacao
);

// Rota para obter todos os votos de um vereador
router.get(
  "/votos-indicacao/vereador/:vereador_id",
  authenticate,
  authorize(["admin", "servidor", 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador' ]),
  votosIndicacaoController.getVotosByVereador
);

// Rota para remover voto
router.delete(
  "/votos-indicacao/:vereador_id/:indicacao_id",
  authenticate,
  authorize(["admin"]),
  votosIndicacaoController.remove
);

export default router;
