import express from "express";
import projetoArquivosController from "../controllers/projetoArquivosController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/projeto-arquivos",
  authenticate,
  authorize(["admin", "servidor", "executivo"]),
  upload.single("arquivo"),
  projetoArquivosController.create
);

router.get(
  "/projeto-arquivos/:projeto_id",
  authenticate,
  authorize(["admin", "servidor", "executivo"]),
  projetoArquivosController.read
);

router.get(
  "/projeto-arquivos/download/:id",
  authenticate,
  authorize(["admin", "servidor", "executivo"]),
  projetoArquivosController.download
);

router.delete(
  "/projeto-arquivos/:id",
  authenticate,
  authorize(["admin", "servidor", "executivo"]),
  projetoArquivosController.delete
);

export default router;
