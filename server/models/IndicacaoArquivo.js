import { pool } from '../config/db.js'

class IndicacaoArquivo {
    static async create(indicacao_id, arquivo_pdf, nome_arquivo) {
        try {
            const [result] = await pool.query(
                "INSERT INTO indicacao_arquivos (indicacao_id, arquivo_pdf, nome_arquivo) VALUES (?, ?, ?)",
                [indicacao_id, arquivo_pdf, nome_arquivo]
            );
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao criar arquivo de indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(indicacao_id = null, id = null) {
        try {
            let query = "SELECT * FROM indicacao_arquivos";
            let values = [];

            if (indicacao_id !== null) {
                query += " WHERE indicacao_id = ?";
                values.push(indicacao_id);
            } else if (id !== null) {
                query += " WHERE id = ?";
                values.push(id);
            }

            const [result] = await pool.query(query, values);
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao buscar arquivos de indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query(
                "DELETE FROM indicacao_arquivos WHERE id = ?",
                [id]
            );
            if (result.affectedRows > 0) {
                return { success: true, message: "Arquivo removido com sucesso!" };
            } else {
                return { success: false, message: "Arquivo não encontrado!" };
            }
        } catch (error) {
            console.error("Erro ao excluir arquivo de indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
}

export default IndicacaoArquivo;
