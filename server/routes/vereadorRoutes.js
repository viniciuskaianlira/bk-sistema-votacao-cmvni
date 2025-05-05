import express from "express";
import VereadorController from "../controllers/vereadorController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

router.post("/vereador", authenticate, authorize(['admin', 'servidor']), VereadorController.create);
router.get("/vereador/:id?", authenticate, authorize(['admin', 'servidor']), VereadorController.read);
router.put("/vereador/:id", authenticate, authorize(['admin', 'servidor']), VereadorController.update);
router.delete("/vereador/:id",  authenticate, authorize(['admin', 'servidor']), VereadorController.delete);

export default router;