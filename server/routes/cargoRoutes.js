import express from "express";
import { getCargos, createCargo } from "../controllers/cargoController.js";

const router = express.Router();

router.get("/cargos", getCargos);
router.post("/cargos", createCargo);

export default router;