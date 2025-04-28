import express from "express";
import IndicacaoProponenteController from "../controllers/indicacaoProponenteController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar um novo proponente para uma indicação
router.post("/indicacao_proponente", authenticate, authorize(['admin', 'servidor', 'vereador']), IndicacaoProponenteController.create);

// Ler os proponentes de uma indicação específica
router.get("/indicacao_proponente", authenticate, authorize(['admin', 'servidor', 'vereador']), IndicacaoProponenteController.read);

// Excluir um proponente de uma indicação específica
router.delete("/indicacao_proponente/:indicacao_id/:vereador_id", authenticate, authorize(['admin', 'servidor']), IndicacaoProponenteController.delete);

export default router;
