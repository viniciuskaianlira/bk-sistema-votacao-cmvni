import express from "express";
import IndicacaoController from "../controllers/indicacaoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/indicacao", authenticate, authorize(['admin', 'servidor', 'vereador']), IndicacaoController.create);
router.get("/indicacao/:id?", authenticate, authorize(['admin', 'servidor', 'vereador']), IndicacaoController.read);
router.put("/indicacao/:id", authenticate, authorize(['admin', 'servidor', 'vereador']), IndicacaoController.update);
router.delete("/indicacao/:id", authenticate, authorize(['admin', 'servidor']), IndicacaoController.delete);

export default router;
