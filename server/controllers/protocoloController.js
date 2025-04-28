import Protocolo from "../models/Protocolo.js";

class ProtocoloController {
    static async create(req, res) {
        const { tipo_protocolo, data_protocolo } = req.body;

        const result = await Protocolo.create(tipo_protocolo, data_protocolo);
        if (result.success) {
            res.status(201).json({ message: "Protocolo criado com sucesso!", id: result.insertId });
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async read(req, res) {
        const { id } = req.params;

        const result = await Protocolo.read(id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { tipo_protocolo, data_protocolo } = req.body;

        const result = await Protocolo.update(id, tipo_protocolo, data_protocolo);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        const result = await Protocolo.delete(id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    }
}

export default ProtocoloController;
