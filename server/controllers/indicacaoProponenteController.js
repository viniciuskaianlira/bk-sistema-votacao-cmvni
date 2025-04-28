import IndicacaoProponente from "../models/IndicacaoProponente.js";

class IndicacaoProponenteController {
    static async create(req, res) {
        const { indicacao_id, vereador_id } = req.body;

        const result = await IndicacaoProponente.create(indicacao_id, vereador_id);
        if (result.success) {
            res.status(201).json({ message: "Proponente adicionado com sucesso!", id: result.insertId });
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async read(req, res) {
        const { indicacao_id, vereador_id } = req.query;

        const result = await IndicacaoProponente.read(indicacao_id, vereador_id);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    }

    static async delete(req, res) {
        const { indicacao_id, vereador_id } = req.params;

        const result = await IndicacaoProponente.delete(indicacao_id, vereador_id);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ message: result.message });
        }
    }
}

export default IndicacaoProponenteController;
