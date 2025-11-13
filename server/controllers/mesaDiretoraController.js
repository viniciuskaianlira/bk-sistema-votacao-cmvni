import MesaDiretora from "../models/MesaDiretora.js";
// ❌ isto aqui está errado e nem é usado, pode remover
// import Vereador from "../models/MesaDiretora.js";

class MesaDiretoraController {
    static async create(req, res) {
        try {
            const { legislatura_id, presidente_id, vice_presidente, primeiro_secretario, segundo_secretario, ano_legislatura } = req.body;

            if (!legislatura_id || !presidente_id || !vice_presidente || !primeiro_secretario || !segundo_secretario || !ano_legislatura) {
                return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
            }

            const insertId = await MesaDiretora.create(
                legislatura_id,
                presidente_id,
                vice_presidente,
                primeiro_secretario,
                segundo_secretario,
                ano_legislatura
            );

            return res.status(201).json({ success: true, message: "Mesa diretora cadastrada com sucesso!", id: insertId });
        } catch (error) {
            console.error("Erro ao cadastrar a mesa diretora!:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    static async read(req, res) {
        try {
            const { id } = req.params;
            const response = await MesaDiretora.read(id ? parseInt(id) : null);

            if (!response.success || response.data.length === 0) {
                return res.status(404).json({ success: false, message: "Nenhuma mesa diretora encontrada." });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao buscar a mesa diretora:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { legislatura_id, presidente_id, vice_presidente, primeiro_secretario, segundo_secretario, ano_legislatura } = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: "É obrigatório informar a mesa diretora!" });
            }

            const response = await MesaDiretora.update(
                parseInt(id),
                legislatura_id || null,
                presidente_id || null,
                vice_presidente || null,
                primeiro_secretario || null,
                segundo_secretario || null,
                ano_legislatura || null
            );

            if (!response.success) {
                return res.status(400).json(response);
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao atualizar a mesa diretora:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: "É obrigatório informar a mesa diretora!" });
            }

            const mesaDiretoraExists = await MesaDiretora.read(parseInt(id));
            if (!mesaDiretoraExists.success || mesaDiretoraExists.data.length === 0) {
                return res.status(404).json({ success: false, message: "Mesa Diretora não encontrada." });
            }

            const response = await MesaDiretora.delete(parseInt(id));

            if (!response.success) {
                return res.status(400).json(response);
            }

            return res.status(200).json({ success: true, message: "Mesa diretora excluída com sucesso!" });
        } catch (error) {
            console.error("Erro ao excluir a mesa diretora:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }

    // 🔎 Buscar mesa diretora por legislatura
    static async readMesaDiretoraForLegislatura(req, res) {
        try {
            // você pode chamar de legislaturaId, legislatura_id, tanto faz, só combinar com a rota
            const { legislaturaId } = req.params;

            if (!legislaturaId) {
                return res.status(400).json({ success: false, message: "É obrigatório informar a legislatura!" });
            }

            const response = await MesaDiretora.readMesaDiretoraForLegislatura(parseInt(legislaturaId));

            if (!response.success || response.data.length === 0) {
                return res.status(404).json({ success: false, message: "Nenhuma mesa diretora encontrada para essa legislatura." });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Erro ao buscar a mesa diretora por legislatura:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }
}

export default MesaDiretoraController;
