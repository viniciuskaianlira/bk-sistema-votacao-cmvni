import PresencaSessao from "../models/presencaSessaoModel.js";

class PresencaSessaoController {

    static async create(req, res) {
        const { sessao_id, vereador_id, data_registro } = req.body;

        if (!sessao_id || !vereador_id || !data_registro) {
            return res.status(400).json({ success: false, message: "Campos obrigatórios não fornecidos." });
        }

        const result = await PresencaSessao.create(sessao_id, vereador_id, data_registro);

        if (result.success) {
            res.status(201).json({ success: true, message: "Presença registrada com sucesso!", insertId: result.insertId });
        } else {
            res.status(500).json(result);
        }
    }

    static async read(req, res) {
        const id = req.params.id || null;

        const result = await PresencaSessao.read(id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json(result);
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { sessao_id, vereador_id, data_registro } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID não fornecido." });
        }

        const result = await PresencaSessao.update(id, sessao_id, vereador_id, data_registro);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID não fornecido." });
        }

        const result = await PresencaSessao.delete(id);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    }

}

export default PresencaSessaoController;
