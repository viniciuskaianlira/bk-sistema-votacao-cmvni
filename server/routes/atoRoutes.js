import express from "express";
import atoController from "../controllers/atoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/ato",
  authenticate,
  authorize(["admin", "servidor"]),
  atoController.create
);

router.get(
  "/ato",
  authenticate,
  authorize(["admin", "servidor"]),
  atoController.read
);

router.put(
  "/ato/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  atoController.update
);

router.delete(
  "/ato/:id",
  authenticate,
  authorize(["admin", "servidor"]),
  atoController.delete
);

export default router;
