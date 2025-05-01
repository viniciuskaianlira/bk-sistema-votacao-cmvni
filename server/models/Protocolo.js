import { pool } from '../config/db.js'

class Protocolo {
    static async create(tipo_protocolo, data_protocolo = null) {
        try {
            const [result] = await pool.query(
                `INSERT INTO protocolo (tipo_protocolo, data_protocolo) VALUES (?, ?)`,
                [tipo_protocolo, data_protocolo || new Date()]
            );

            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao criar protocolo:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = "SELECT * FROM protocolo";
            const values = [];

            if (id !== null) {
                query += " WHERE id = ?";
                values.push(id);
            }

            const [result] = await pool.query(query, values);

            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao buscar protocolos:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async update(id, tipo_protocolo = null, data_protocolo = null) {
        try {
            const updates = [];
            const values = [];

            if (tipo_protocolo !== null) {
                updates.push("tipo_protocolo = ?");
                values.push(tipo_protocolo);
            }
            if (data_protocolo !== null) {
                updates.push("data_protocolo = ?");
                values.push(data_protocolo);
            }

            if (updates.length === 0) {
                return { success: false, message: "Nenhuma alteração fornecida." };
            }

            const query = `UPDATE protocolo SET ${updates.join(", ")} WHERE id = ?`;
            values.push(id);

            const [result] = await pool.query(query, values);

            if (result.affectedRows > 0) {
                return { success: true, message: "Protocolo atualizado com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar protocolo:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query(
                "DELETE FROM protocolo WHERE id = ?",
                [id]
            );

            if (result.affectedRows > 0) {
                return { success: true, message: "Protocolo excluído com sucesso!" };
            } else {
                return { success: false, message: "Protocolo não encontrado." };
            }
        } catch (error) {
            console.error("Erro ao excluir protocolo:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
}

export default Protocolo;