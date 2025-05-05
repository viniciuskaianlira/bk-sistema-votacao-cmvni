import { pool } from '../config/db.js'

class Vereador {

    static async create(user_id, legislatura_id, partido, sigla_partido, ativo = true) {
        try {
            const [result] = await pool.query(
                "INSERT INTO vereadores (user_id, legislatura_id, partido, sigla_partido, ativo) VALUES (?, ?, ?, ?, ?)",
                [user_id, legislatura_id, partido, sigla_partido, ativo]
            );
    
            return result.insertId;
        } catch (error) {
            console.error("Erro ao inserir um vereador:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = `
                SELECT v.id, v.partido, v.sigla_partido, v.ativo AS vereador_ativo,
                       u.id AS user_id, u.nome AS nome_vereador, u.ativo AS usuario_ativo
                FROM vereadores v
                JOIN users u ON v.user_id = u.id
            `;
            let values = [];
    
            if (id !== null) {
                query += " WHERE v.id = ?";
                values.push(id);
            }
    
            const [result] = await pool.query(query, values);
    
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao realizar a leitura:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async readByUserId(user_id) {
        const sql = `
          SELECT
            v.*,
            u.nome        AS usuario_nome,
            l.numero      AS legislatura_numero,
            l.data_inicio AS legislatura_inicio,
            l.data_fim    AS legislatura_fim
          FROM vereadores v
          JOIN users u        ON v.user_id = u.id
          JOIN legislatura l  ON v.legislatura_id = l.id
          WHERE v.user_id = ?
        `;
    
        const [rows] = await pool.query(sql, [user_id]);
        return rows;
    }

    static async readByUserName(username, legislatura_id) {
        const sql = `
          SELECT
            v.*,
            u.nome        AS usuario_nome,
            l.numero      AS legislatura_numero
          FROM vereadores v
          JOIN users u        ON v.user_id = u.id
          JOIN legislatura l  ON v.legislatura_id = l.id
          WHERE u.username = ?
            AND v.legislatura_id = ?
        `;
    
        const [rows] = await pool.query(sql, [username, legislatura_id]);
        return rows;
    }
    
    static async update(id, user_id = null, partido = null, sigla_partido = null, ativo = null, legislatura_id = null) {
        try {
            // 📌 Verifica se já existe um vereador vinculado ao mesmo user_id em outra entrada
            if (user_id !== null) {
                const [existingVereador] = await pool.query(
                    "SELECT id FROM vereadores WHERE user_id = ? AND id <> ?",
                    [user_id, id]
                );
    
                if (existingVereador.length > 0) {
                    return { success: false, message: "Este usuário já está vinculado a outro vereador!" };
                }
            }
    
            // 📌 Monta a query de atualização
            let query = "UPDATE vereadores SET ";
            let values = [];
            let updates = [];
    
            if (user_id !== null) {
                updates.push("user_id = ?");
                values.push(user_id);
            }
            if (partido !== null) {
                updates.push("partido = ?");
                values.push(partido);
            }
            if (sigla_partido !== null) {
                updates.push("sigla_partido = ?");
                values.push(sigla_partido);
            }
            if (ativo !== null) {
                updates.push("ativo = ?");
                values.push(ativo);
            }
            if (legislatura_id !== null) {
                updates.push("legislatura_id = ?");
                values.push(legislatura_id);
            }
    
            // 📌 Se nenhum campo for atualizado, retorna um erro
            if (updates.length === 0) {
                return { success: false, message: "Nenhuma alteração fornecida." };
            }
    
            // 📌 Finaliza a query e adiciona o ID no array de valores
            query += updates.join(", ") + " WHERE id = ?";
            values.push(id);
    
            const [result] = await pool.query(query, values);
    
            if (result.affectedRows > 0) {
                return { success: true, message: "Vereador atualizado com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar vereador:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async delete(id) {
        try {
            const [result] = await pool.query("DELETE FROM vereadores WHERE id = ?", [id]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Vereador excluído com sucesso!" };
            } else {
                return { success: false, message: "Vereador não encontrado." };
            }
        } catch (error) {
            console.error("Erro ao excluir vereador:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
 
}

export default Vereador;
