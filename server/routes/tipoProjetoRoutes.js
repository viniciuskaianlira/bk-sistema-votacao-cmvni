import express from "express";
import tipoProjetoController from "../controllers/tipoProjetoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tipo_projeto", authenticate, authorize(['admin', 'servidor', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), tipoProjetoController.create);
router.get("/tipo_projeto/:id?", authenticate, authorize(['admin', 'servidor', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), tipoProjetoController.read);
router.put("/tipo_projeto/:id", authenticate, authorize(['admin', 'servidor', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), tipoProjetoController.update);
router.delete("/tipo_projeto/:id", authenticate, authorize(['admin', 'servidor']), tipoProjetoController.delete);

export default router;
