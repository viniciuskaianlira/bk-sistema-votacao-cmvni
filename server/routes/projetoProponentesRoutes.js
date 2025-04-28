import express from "express";
import projetoProponentesController from "../controllers/projetoProponentesController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projeto-proponentes", authenticate, authorize(['admin', 'servidor', 'executivo']), projetoProponentesController.create);
router.get("/projeto-proponentes/:projeto_id?", authenticate, authorize(['admin', 'servidor', 'executivo']), projetoProponentesController.read);
router.delete("/projeto-proponentes/:projeto_id/:vereador_id", authenticate, authorize(['admin']), projetoProponentesController.delete);

export default router;
