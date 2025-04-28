import express from "express";
import LegislaturaController from "../controllers/legislaturaController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

router.post("/legislatura", authenticate, authorize(['admin', 'servidor']), LegislaturaController.create);
router.get("/legislatura/:id?", authenticate, authorize(['admin', 'servidor']), LegislaturaController.read);
router.put("/legislatura/:id", authenticate, authorize(['admin', 'servidor']), LegislaturaController.update);

export default router;