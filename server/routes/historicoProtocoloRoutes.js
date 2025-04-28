import express from "express";
import HistoricoProtocoloController from "../controllers/historicoProtocoloController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/historico_protocolo", authenticate, authorize(['admin', 'servidor', 'executivo']), HistoricoProtocoloController.create);
router.get("/historico_protocolo/:id?", authenticate, authorize(['admin', 'servidor', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), HistoricoProtocoloController.read);
router.put("/historico_protocolo/:id", authenticate, authorize(['admin', 'servidor', 'executivo']), HistoricoProtocoloController.update);
router.delete("/historico_protocolo/:id", authenticate, authorize(['admin' ]), HistoricoProtocoloController.delete);

export default router;
