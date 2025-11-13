import express from "express";
import MesaDiretoraController from "../controllers/mesaDiretoraController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

router.post("/mesa_diretora", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.create);
router.get("/mesa_diretora/:id?", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.read);
router.get("/mesadiretora/legislatura/:id?", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.readMesaDiretoraForLegislatura);
router.put("/mesa_diretora/:id", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.update);
router.delete("/mesa_diretora/:id",  authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.delete);

export default router;