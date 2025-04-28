import express from "express";
import SessaoController from "../controllers/sessaoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

router.post("/sessao_legislativa", authenticate, authorize(['admin', 'servidor']), SessaoController.criarSessao);
router.get("/sessao_legislativa/:id?", authenticate, authorize(['admin', 'servidor']), SessaoController.listarSessoes);
router.put("/sessao_legislativa/:id", authenticate, authorize(['admin', 'servidor']), SessaoController.atualizarSessao);
router.delete("/sessao_legislativa/:id", authenticate, authorize(['admin', 'servidor']), SessaoController.deletarSessao);

export default router;
