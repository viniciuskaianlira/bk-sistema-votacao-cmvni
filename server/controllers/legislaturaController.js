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

    static async readByUserId(req, res) {
        try {
          const userId = req.params.id
          // busca os registros puros do DB
          const rows = await Legislatura.readByIdUser(userId)
    
          // formata as datas para DD/MM/YYYY
          const formatted = rows.map(row => ({
            ...row,
            data_inicio: new Date(row.data_inicio)
                           .toLocaleDateString('pt-BR'),
            data_fim:    new Date(row.data_fim)
                           .toLocaleDateString('pt-BR')
          }))
    
          res.json(formatted)
        } catch (err) {
          console.error(err)
          res.status(500).json({ message: 'Erro ao buscar legislaturas do usuário.' })
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

    static async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ success: false, message: "O ID da legislatura é obrigatório!" });
            }

            const response = await Legislatura.delete(parseInt(id));

            if (!response.success) {
                // Se for erro de FK ou não encontrada → 400
                return res.status(400).json(response);
            }

            return res.status(200).json(response);

        } catch (error) {
            console.error("Erro ao excluir legislatura:", error);
            return res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    }
}

export default LegislaturaController;
