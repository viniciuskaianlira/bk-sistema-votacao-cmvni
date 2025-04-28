import Cargo from "../models/Cargo.js";

export const getCargos = async (req, res) => {
  try {
    const cargos = await Cargo.getAll();
    res.json(cargos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cargos" });
  }
};

export const createCargo = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });

    const cargoId = await Cargo.create(nome);
    res.status(201).json({ id: cargoId, nome });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar cargo" });
  }
};