import express from "express";
import VereadorController from "../controllers/vereadorController.js";
import LegislaturaController from "../controllers/legislaturaController.js";
import IndicacaoController from "../controllers/IndicacaoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

router.post("/vereador", authenticate, authorize(['admin', 'servidor']), VereadorController.create);
router.get("/vereador/:id?", authenticate, authorize(['admin', 'servidor']), VereadorController.read);

router.get("/vereador/:id/legislaturas", authenticate, authorize(['admin', 'servidor']), LegislaturaController.readByUserId);
router.get("/vereador/:id/indicacoes", authenticate, authorize(['admin', 'servidor']), IndicacaoController.readByUserId);

router.put("/vereador/:id", authenticate, authorize(['admin', 'servidor']), VereadorController.update);
router.delete("/vereador/:id",  authenticate, authorize(['admin', 'servidor']), VereadorController.delete);


export default router;