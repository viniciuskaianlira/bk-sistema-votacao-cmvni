import { pool } from '../config/db.js'

class Sessao {

    static async create(numero, data_sessao, tipo, presidida_id) {
        try {
            const [result] = await pool.query(
                "INSERT INTO sessao_legislativa (numero, data_sessao, tipo, presidida_id) VALUES (?, ?, ?, ?)",
                [numero, data_sessao, tipo, presidida_id]
            );
    
            return result.insertId;
        } catch (error) {
            console.error("Erro ao inserir a sessão:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = "SELECT * FROM sessao_legislativa ";
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
    
    static async update(id, numero = null, data_sessao = null, tipo = null, presidida_id = null) {
        try {
            let query = "UPDATE sessao_legislativa SET ";
            let values = [];
            let updates = [];
    
            if (numero !== null) {
                updates.push("numero = ?");
                values.push(numero);
            }
            if (data_sessao !== null) {
                updates.push("data_sessao = ?");
                values.push(data_sessao);
            }
            if (tipo !== null) {
                updates.push("tipo = ?");
                values.push(tipo);
            }
            if (presidida_id !== null) {
                updates.push("presidida_id = ?");
                values.push(presidida_id);
            }
    
            // ⚠️ Essa verificação deve estar fora dos blocos acima
            if (updates.length === 0) {
                return { success: false, message: "Nenhuma alteração fornecida." };
            }
    
            query += updates.join(", ") + " WHERE id = ?";
            values.push(id);
    
            const [result] = await pool.query(query, values);
    
            if (result.affectedRows > 0) {
                return { success: true, message: "Sessão atualizada com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar a sessão:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
    
    
    static async delete(id) {
        try {
            const [result] = await pool.query("DELETE FROM sessao_legislativa WHERE id = ?", [id]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Exclusão realizada com sucesso!" };
            } else {
                return { success: false, message: "Erro ao buscar!" };
            }
        } catch (error) {
            console.error("Erro ao realizar a exclusão:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
 
}

export default Sessao;
