import Legislatura from "../models/Legislatura.js";

class LegislaturaController {
    // Criar uma nova legislatura
    static async create(req, res) {
        try {
            const { numero, data_inicio, data_fim } = req.body;

            // 📌 Validação básica
            if (!numero || !data_inicio || !data_fim) {
                return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
            }

            const insertId = await Legislatura.create(numero, data_inicio, data_fim);
            return res.status(201).json({ success: true, message: "Legislatura cadastrada com sucesso!", id: insertId });
        } catch (error) {
            console.error("Erro ao cadastrar legislatura:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    // Buscar legislaturas (todas ou por ID)
    static async read(req, res) {
        try {
            const { id } = req.params;
            const response = await Legislatura.read(id ? parseInt(id) : null);

            if (!response.success) {
                return res.status(404).json({ success: false, message: "Legislatura não encontrada." });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao buscar legislatura:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    // Atualizar uma legislatura
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { numero, data_inicio, data_fim } = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: "O ID da legislatura é obrigatório!" });
            }

            const response = await Legislatura.update(parseInt(id), numero, data_inicio, data_fim);

            if (!response.success) {
                return res.status(400).json(response);
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao atualizar legislatura:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }
}

export default LegislaturaController;
