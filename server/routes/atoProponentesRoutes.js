import express from "express";
import atoProponentesController from "../controllers/atoProponentesController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/ato-proponentes",
  authenticate,
  authorize(["admin", "servidor"]),
  atoProponentesController.add
);

router.get(
  "/ato-proponentes/:ato_id",
  authenticate,
  authorize(["admin", "servidor"]),
  atoProponentesController.listByAto
);

router.delete(
  "/ato-proponentes",
  authenticate,
  authorize(["admin", "servidor"]),
  atoProponentesController.remove
);

export default router;
