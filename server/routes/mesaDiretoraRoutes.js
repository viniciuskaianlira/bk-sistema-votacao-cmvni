import express from "express";
import MesaDiretoraController from "../controllers/mesaDiretoraController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js"; // Importa os middlewares

const router = express.Router();

router.post("/mesa-diretora", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.create);
router.get("/mesa-diretora/:id?", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.read);
router.put("/mesa-diretora/:id", authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.update);
router.delete("/mesa-diretora/:id",  authenticate, authorize(['admin', 'servidor']), MesaDiretoraController.delete);

export default router;