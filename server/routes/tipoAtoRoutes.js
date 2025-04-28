import express from "express";
import tipoAtoController from "../controllers/tipoAtoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/tipo-ato",
  authenticate,
  authorize(["admin", "servidor"]),
  tipoAtoController.create
);

router.get(
  "/tipo-ato",
  authenticate,
  authorize(["admin", "servidor"]),
  tipoAtoController.read
);

router.put(
  "/tipo-ato/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  tipoAtoController.update
);

router.delete(
  "/tipo-ato/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  tipoAtoController.delete
);

export default router;
