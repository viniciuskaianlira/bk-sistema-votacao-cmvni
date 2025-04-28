import express from "express";
import projetoController from "../controllers/projetoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projeto", authenticate, authorize(['admin', 'servidor', 'executivo']), projetoController.create);
router.get("/projeto/:id?", authenticate, authorize(['admin', 'servidor', 'executivo']), projetoController.read);
router.put("/projeto/:id", authenticate, authorize(['admin', 'servidor', 'executivo']), projetoController.update);
router.delete("/projeto/:id", authenticate, authorize(['admin', 'servidor']), projetoController.delete);

export default router;
