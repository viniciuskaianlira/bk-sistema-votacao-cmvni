import { pool } from '../config/db.js'

class PresencaSessao {

    static async create(sessao_id, vereador_id, data_registro) {
        try {
            const [result] = await pool.query(
                "INSERT INTO presenca_sessoes (sessao_id, vereador_id, data_registro) VALUES (?, ?, ?)",
                [sessao_id, vereador_id, data_registro]
            );
    
            return { success: true, insertId: result.insertId };
        } catch (error) {
            console.error("Erro ao registrar presença:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = "SELECT * FROM presenca_sessoes";
            let values = [];

            if (id !== null) {
                query += " WHERE id = ?";
                values.push(id);
            }
    
            const [result] = await pool.query(query, values);
    
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao realizar a leitura:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async update(id, sessao_id = null, vereador_id = null, data_registro = null) {
        try {
            let query = "UPDATE presenca_sessoes SET ";
            let values = [];
            let updates = [];
    
            if (sessao_id !== null) {
                updates.push("sessao_id = ?");
                values.push(sessao_id);
            }
            if (vereador_id !== null) {
                updates.push("vereador_id = ?");
                values.push(vereador_id);
            }
            if (data_registro !== null) {
                updates.push("data_registro = ?");
                values.push(data_registro);
            }

            if (updates.length === 0) {
                return { success: false, message: "Nenhuma alteração fornecida." };
            }

            query += updates.join(", ") + " WHERE id = ?";
            values.push(id);
    
            const [result] = await pool.query(query, values);
    
            if (result.affectedRows > 0) {
                return { success: true, message: "Registro atualizado com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query("DELETE FROM presenca_sessoes WHERE id = ?", [id]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Exclusão realizada com sucesso!" };
            } else {
                return { success: false, message: "Registro não encontrado." };
            }
        } catch (error) {
            console.error("Erro ao realizar a exclusão:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

}

export default PresencaSessao;
