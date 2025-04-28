import Vereador from "../models/Vereador.js";

class VereadorController {
    // 📌 Criar um novo vereador
    static async create(req, res) {
        try {
            const { user_id, legislatura_id, partido, sigla_partido } = req.body;

            // 📌 Validação básica
            if (!user_id || !legislatura_id || !partido || !sigla_partido) {
                return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
            }

            // 📌 Verifica se já existe um vereador vinculado a esse usuário
            const existingVereador = await Vereador.readByUserId(user_id);
            if (existingVereador.success && existingVereador.data.length > 0) {
                return res.status(400).json({ success: false, message: "Este usuário já está cadastrado como vereador!" });
            }

            const insertId = await Vereador.create(user_id, legislatura_id, partido, sigla_partido);
            return res.status(201).json({ success: true, message: "Vereador cadastrado com sucesso!", id: insertId });
        } catch (error) {
            console.error("Erro ao cadastrar o vereador:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    // 📌 Buscar vereadores (todos ou por ID)
    static async read(req, res) {
        try {
            const { id } = req.params;
            const response = await Vereador.read(id ? parseInt(id) : null);

            if (!response.success || response.data.length === 0) {
                return res.status(404).json({ success: false, message: "Nenhum vereador encontrado." });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao buscar vereador:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    // 📌 Atualizar um vereador
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { user_id, legislatura_id, partido, sigla_partido, ativo } = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: "É obrigatório informar o ID do vereador!" });
            }

            const response = await Vereador.update(
                parseInt(id),
                user_id || null,
                partido || null,
                sigla_partido || null,
                ativo !== undefined ? ativo : null,
                legislatura_id || null
            );

            if (!response.success) {
                return res.status(400).json(response);
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao atualizar o vereador:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: "É obrigatório informar o vereador!" });
            }

            // 📌 Verifica se o vereador existe
            const vereadorExists = await Vereador.read(parseInt(id));
            if (!vereadorExists.success || vereadorExists.data.length === 0) {
                return res.status(404).json({ success: false, message: "Vereador não encontrado." });
            }

            const response = await Vereador.delete(parseInt(id));

            if (!response.success) {
                return res.status(400).json(response);
            }

            return res.status(200).json({ success: true, message: "Vereador excluído com sucesso!" });
        } catch (error) {
            console.error("Erro ao excluir o vereador:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }
}

export default VereadorController;
