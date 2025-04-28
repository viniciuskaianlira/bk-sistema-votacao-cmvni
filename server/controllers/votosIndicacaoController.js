import VotoIndicacao from "../models/VotoIndicacao.js";

class votosIndicacaoController {
  // Registrar voto
  static async add(req, res) {
    const { vereador_id, indicacao_id, voto } = req.body;
    const resultado = await VotoIndicacao.addVotoIndicacao({ vereador_id, indicacao_id, voto });
    res.status(resultado.success ? 201 : 500).json(resultado);
  }

  // Obter voto de um vereador para uma indicação específica
  static async getById(req, res) {
    const { vereador_id, indicacao_id } = req.params;
    const resultado = await VotoIndicacao.getVotoIndicacaoById({ vereador_id, indicacao_id });
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  // Obter todos os votos de uma indicação
  static async getVotosByIndicacao(req, res) {
    const { indicacao_id } = req.params;
    const resultado = await VotoIndicacao.getVotosByIndicacao(indicacao_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  // Obter todos os votos de um vereador
  static async getVotosByVereador(req, res) {
    const { vereador_id } = req.params;
    const resultado = await VotoIndicacao.getVotosByVereador(vereador_id);
    res.status(resultado.success ? 200 : 500).json(resultado);
  }

  // Remover voto
  static async remove(req, res) {
    const { vereador_id, indicacao_id } = req.params;
    const resultado = await VotoIndicacao.removeVotoIndicacao({ vereador_id, indicacao_id });
    res.status(resultado.success ? 200 : 404).json(resultado);
  }
}

export default votosIndicacaoController;
