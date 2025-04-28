import express from "express";
import atoArquivosController from "../controllers/atoArquivosController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/ato-arquivos",
  authenticate,
  authorize(["admin", "servidor"]),
  atoArquivosController.add
);

router.get(
  "/ato-arquivos/:ato_id",
  authenticate,
  authorize(["admin", "servidor"]),
  atoArquivosController.listByAto
);

router.delete(
  "/ato-arquivos",
  authenticate,
  authorize(["admin", "servidor"]),
  atoArquivosController.remove
);

export default router;
