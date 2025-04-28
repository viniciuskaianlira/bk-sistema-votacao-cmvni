import HistoricoProtocolo from "../models/HistoricoProtocolo.js";

class HistoricoProtocoloController {
    static async create(req, res) {
        const { protocolo_id, status, data_status } = req.body;

        const result = await HistoricoProtocolo.create(protocolo_id, status, data_status);
        if (result.success) {
            res.status(201).json({ message: "Histórico criado com sucesso!", id: result.insertId });
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async read(req, res) {
        const { id } = req.params;
        const result = await HistoricoProtocolo.read(id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { protocolo_id, status, data_status } = req.body;

        const result = await HistoricoProtocolo.update(id, protocolo_id, status, data_status);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        const result = await HistoricoProtocolo.delete(id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    }
}

export default HistoricoProtocoloController;
