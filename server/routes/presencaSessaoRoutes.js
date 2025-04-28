import express from "express";
import PresencaSessaoController from "../controllers/presencaSessaoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/presenca_sessao", authenticate, authorize(['admin', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), PresencaSessaoController.create);
router.get("/presenca_sessao/:id?", authenticate, authorize(['admin', 'servidor', 'publico', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), PresencaSessaoController.read);
router.put("/presenca_sessao/:id", authenticate, authorize(['admin']), PresencaSessaoController.update);
router.delete("/presenca_sessao/:id", authenticate, authorize(['admin']), PresencaSessaoController.delete);

export default router;
