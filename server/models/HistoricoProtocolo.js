import { pool } from '../config/db.js'

class HistoricoProtocolo {
    static async create(protocolo_id, status = 'Aguardando', data_status = null) {
        try {
            const [result] = await pool.query(
                "INSERT INTO historico_protocolo (protocolo_id, status, data_status) VALUES (?, ?, ?)",
                [protocolo_id, status, data_status]
            );
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao criar histórico do protocolo:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = "SELECT * FROM historico_protocolo";
            let values = [];

            if (id !== null) {
                query += " WHERE id = ?";
                values.push(id);
            }

            const [result] = await pool.query(query, values);
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async update(id, protocolo_id = null, status = null, data_status = null) {
        try {
            let updates = [];
            let values = [];

            if (protocolo_id !== null) {
                updates.push("protocolo_id = ?");
                values.push(protocolo_id);
            }
            if (status !== null) {
                updates.push("status = ?");
                values.push(status);
            }
            if (data_status !== null) {
                updates.push("data_status = ?");
                values.push(data_status);
            }

            if (updates.length === 0) {
                return { success: false, message: "Nenhuma alteração fornecida." };
            }

            const query = `UPDATE historico_protocolo SET ${updates.join(", ")} WHERE id = ?`;
            values.push(id);

            const [result] = await pool.query(query, values);

            if (result.affectedRows > 0) {
                return { success: true, message: "Histórico atualizado com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar histórico:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query("DELETE FROM historico_protocolo WHERE id = ?", [id]);
            if (result.affectedRows > 0) {
                return { success: true, message: "Histórico removido com sucesso!" };
            } else {
                return { success: false, message: "Histórico não encontrado!" };
            }
        } catch (error) {
            console.error("Erro ao excluir histórico:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
}

export default HistoricoProtocolo;
