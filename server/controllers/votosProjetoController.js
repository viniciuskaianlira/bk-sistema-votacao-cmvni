import VotoProjeto from "../models/VotoProjeto.js";

class votosProjetoController {
  // Registrar voto
  static async add(req, res) {
    const { vereador_id, projeto_id, voto } = req.body;
    const resultado = await VotoProjeto.addVotoProjeto({ vereador_id, projeto_id, voto });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  // Obter voto de um vereador para um projeto específico
  static async getById(req, res) {
    const { vereador_id, projeto_id } = req.params;
    const resultado = await VotoProjeto.getVotoProjetoById({ vereador_id, projeto_id });
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  // Obter todos os votos de um projeto
  static async getVotosByProjeto(req, res) {
    const { projeto_id } = req.params;
    const resultado = await VotoProjeto.getVotosByProjeto(projeto_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  // Obter todos os votos de um vereador
  static async getVotosByVereador(req, res) {
    const { vereador_id } = req.params;
    const resultado = await VotoProjeto.getVotosByVereador(vereador_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  // Remover voto
  static async remove(req, res) {
    const { vereador_id, projeto_id } = req.params;
    const resultado = await VotoProjeto.removeVotoProjeto({ vereador_id, projeto_id });
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default votosProjetoController;
