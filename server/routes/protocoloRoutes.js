import express from "express";
import ProtocoloController from "../controllers/protocoloController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/protocolo", authenticate, authorize(['admin', 'servidor', 'executivo']), ProtocoloController.create);
router.get("/protocolo/:id?", authenticate, authorize(['admin', 'servidor', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador']), ProtocoloController.read);
router.put("/protocolo/:id", authenticate, authorize(['admin', 'servidor', 'executivo']), ProtocoloController.update);
router.delete("/protocolo/:id", authenticate, authorize(['admin']), ProtocoloController.delete);

export default router;
