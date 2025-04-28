import Sessao from "../models/Sessao.js";

class SessaoController {
    static async criarSessao(req, res) {
        const { numero, data_sessao, tipo, presidida_id } = req.body;

        const id = await Sessao.create(numero, data_sessao, tipo, presidida_id);
        
        if (typeof id === "number") {
            return res.status(201).json({ success: true, message: "Sessão criada com sucesso!", id });
        }

        return res.status(500).json(id); // já retorna { success: false, message: ... }
    }

    static async listarSessoes(req, res) {
        const id = req.params.id || null;

        const resultado = await Sessao.read(id);

        if (resultado.success) {
            return res.status(200).json(resultado);
        }

        return res.status(500).json(resultado);
    }

    static async atualizarSessao(req, res) {
        const { id } = req.params;
        const { numero, data_sessao, tipo, presidida_id } = req.body;

        const resultado = await Sessao.update(id, numero, data_sessao, tipo, presidida_id);

        if (resultado.success) {
            return res.status(200).json(resultado);
        }

        return res.status(400).json(resultado);
    }

    static async deletarSessao(req, res) {
        const { id } = req.params;

        const resultado = await Sessao.delete(id);

        if (resultado.success) {
            return res.status(200).json(resultado);
        }

        return res.status(404).json(resultado);
    }
}

export default SessaoController;
