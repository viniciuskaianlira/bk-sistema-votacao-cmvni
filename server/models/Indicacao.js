import { pool } from '../config/db.js'

class Indicacao {
    static async create(numero, texto, justificativa, usuario_id, promponente_id, protocolo_id) {
        try {
            const [result] = await pool.query(
                "INSERT INTO indicacoes (numero, texto, justificativa, usuario_id, promponente_id, protocolo_id) VALUES (?, ?, ?, ?, ?, ?)",
                [numero, texto, justificativa, usuario_id, promponente_id, protocolo_id]
            );
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao criar indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = "SELECT * FROM indicacoes";
            let values = [];

            if (id !== null) {
                query += " WHERE id = ?";
                values.push(id);
            }

            const [result] = await pool.query(query, values);
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao buscar indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async readByUserId(userId) {
        const sql = `
          SELECT id, numero, texto, justificativa, data_criacao,
                 usuario_id, promponente_id, protocolo_id
          FROM indicacoes
          WHERE usuario_id = ?
          ORDER BY data_criacao DESC
        `
        const [rows] = await pool.query(sql, [userId])
        return rows
    }

    static async update(id, numero = null, texto = null, justificativa = null, usuario_id = null, promponente_id = null, protocolo_id = null) {
        try {
            let updates = [];
            let values = [];

            if (numero !== null) {
                updates.push("numero = ?");
                values.push(numero);
            }
            if (texto !== null) {
                updates.push("texto = ?");
                values.push(texto);
            }
            if (justificativa !== null) {
                updates.push("justificativa = ?");
                values.push(justificativa);
            }
            if (usuario_id !== null) {
                updates.push("usuario_id = ?");
                values.push(usuario_id);
            }
            if (promponente_id !== null) {
                updates.push("promponente_id = ?");
                values.push(promponente_id);
            }
            if (protocolo_id !== null) {
                updates.push("protocolo_id = ?");
                values.push(protocolo_id);
            }

            if (updates.length === 0) {
                return { success: false, message: "Nenhuma alteração fornecida." };
            }

            const query = `UPDATE indicacoes SET ${updates.join(", ")} WHERE id = ?`;
            values.push(id);

            const [result] = await pool.query(query, values);

            if (result.affectedRows > 0) {
                return { success: true, message: "Indicação atualizada com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query("DELETE FROM indicacoes WHERE id = ?", [id]);
            if (result.affectedRows > 0) {
                return { success: true, message: "Indicação removida com sucesso!" };
            } else {
                return { success: false, message: "Indicação não encontrada!" };
            }
        } catch (error) {
            console.error("Erro ao excluir indicação:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
}

export default Indicacao;
