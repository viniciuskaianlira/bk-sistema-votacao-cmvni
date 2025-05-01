import { pool } from '../config/db.js'

class IndicacaoProponente {
    static async create(indicacao_id, vereador_id) {
        try {
            const [result] = await pool.query(
                "INSERT INTO indicacao_proponentes (indicacao_id, vereador_id) VALUES (?, ?)",
                [indicacao_id, vereador_id]
            );
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao criar proponente para indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(indicacao_id = null, vereador_id = null) {
        try {
            let query = "SELECT * FROM indicacao_proponentes";
            let values = [];

            if (indicacao_id !== null || vereador_id !== null) {
                query += " WHERE";
                if (indicacao_id !== null) {
                    query += " indicacao_id = ?";
                    values.push(indicacao_id);
                }
                if (vereador_id !== null) {
                    if (values.length > 0) query += " AND";
                    query += " vereador_id = ?";
                    values.push(vereador_id);
                }
            }

            const [result] = await pool.query(query, values);
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao buscar proponentes para indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(indicacao_id, vereador_id) {
        try {
            const [result] = await pool.query(
                "DELETE FROM indicacao_proponentes WHERE indicacao_id = ? AND vereador_id = ?",
                [indicacao_id, vereador_id]
            );
            if (result.affectedRows > 0) {
                return { success: true, message: "Proponente removido com sucesso!" };
            } else {
                return { success: false, message: "Proponente não encontrado!" };
            }
        } catch (error) {
            console.error("Erro ao excluir proponente:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
}

export default IndicacaoProponente;
