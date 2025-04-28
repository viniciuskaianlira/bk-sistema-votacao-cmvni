import Indicacao from "../models/Indicacao.js";

class IndicacaoController {
    static async create(req, res) {
        const { numero, texto, justificativa, usuario_id, promponente_id, protocolo_id } = req.body;

        const result = await Indicacao.create(numero, texto, justificativa, usuario_id, promponente_id, protocolo_id);
        if (result.success) {
            res.status(201).json({ message: "Indicação criada com sucesso!", id: result.insertId });
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async read(req, res) {
        const { id } = req.params;
        const result = await Indicacao.read(id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { numero, texto, justificativa, usuario_id, promponente_id, protocolo_id } = req.body;

        const result = await Indicacao.update(id, numero, texto, justificativa, usuario_id, promponente_id, protocolo_id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        const result = await Indicacao.delete(id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    }
}

export default IndicacaoController;
