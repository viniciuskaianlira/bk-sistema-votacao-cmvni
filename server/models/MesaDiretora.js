import { pool } from '../config/db.js'

class MesaDiretora {

    static async create(legislatura_id, presidente_id, vice_presidente, primeiro_secretario, segundo_secretario, ano_legislatura) {
        try {
            const [result] = await pool.query(
                "INSERT INTO mesa_diretora (legislatura_id, presidente_id, vice_presidente, primeiro_secretario, segundo_secretario, ano_legislatura) VALUES (?, ?, ?, ?, ?, ?)",
                [legislatura_id, presidente_id, vice_presidente, primeiro_secretario, segundo_secretario, ano_legislatura]
            );
    
            return result.insertId;
        } catch (error) {
            console.error("Erro ao inserir a mesa diretora:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = `
                SELECT 
                    md.id, md.ano_legislatura,
                    l.id AS legislatura_id, l.numero AS numero_legislatura, l.data_inicio, l.data_fim,
                    p.id AS presidente_id, p.partido AS presidente_partido, u_p.nome AS presidente_nome,
                    vp.id AS vice_presidente_id, vp.partido AS vice_presidente_partido, u_vp.nome AS vice_presidente_nome,
                    ps.id AS primeiro_secretario_id, ps.partido AS primeiro_secretario_partido, u_ps.nome AS primeiro_secretario_nome,
                    ss.id AS segundo_secretario_id, ss.partido AS segundo_secretario_partido, u_ss.nome AS segundo_secretario_nome
                FROM mesa_diretora md
                JOIN legislatura l ON md.legislatura_id = l.id
                JOIN vereadores p ON md.presidente_id = p.id
                JOIN users u_p ON p.user_id = u_p.id
                JOIN vereadores vp ON md.vice_presidente = vp.id
                JOIN users u_vp ON vp.user_id = u_vp.id
                JOIN vereadores ps ON md.primeiro_secretario = ps.id
                JOIN users u_ps ON ps.user_id = u_ps.id
                JOIN vereadores ss ON md.segundo_secretario = ss.id
                JOIN users u_ss ON ss.user_id = u_ss.id
            `;
            let values = [];
    
            if (id !== null) {
                query += " WHERE md.id = ?";
                values.push(id);
            }
    
            const [result] = await pool.query(query, values);
    
            return { success: true, data: result };
        } catch (error) {
            console.error("Erro ao realizar a leitura:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
    
    static async update(id, legislatura_id = null, presidente_id = null, vice_presidente = null, primeiro_secretario = null, segundo_secretario = null, ano_legislatura = null) {
        try {
   
            // 📌 Monta a query de atualização
            let query = "UPDATE mesa_diretora SET ";
            let values = [];
            let updates = [];
    
            if (legislatura_id !== null) {
                updates.push("legislatura_id = ?");
                values.push(legislatura_id);
            }
            if (presidente_id !== null) {
                updates.push("presidente_id = ?");
                values.push(presidente_id);
            }
            if ( vice_presidente !== null) {
                updates.push(" vice_presidente = ?");
                values.push(vice_presidente);
            }
            if (primeiro_secretario !== null) {
                updates.push("primeiro_secretario = ?");
                values.push(primeiro_secretario);
            }
            if (segundo_secretario !== null) {
                updates.push("segundo_secretario = ?");
                values.push(segundo_secretario);
            }
            if (ano_legislatura !== null) {
                updates.push("ano_legislatura = ?");
                values.push(ano_legislatura);
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
                return { success: true, message: "Mesa diretora atualizada com sucesso!" };
            } else {
                return { success: false, message: "Nenhuma alteração feita." };
            }
        } catch (error) {
            console.error("Erro ao atualizar a mesa diretora:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
    
    static async delete(id) {
        try {
            const [result] = await pool.query("DELETE FROM mesa_diretora WHERE id = ?", [id]);

            if (result.affectedRows > 0) {
                return { success: true, message: "Mesa Diretora excluída com sucesso!" };
            } else {
                return { success: false, message: "Mesa Diretora não encontrada." };
            }
        } catch (error) {
            console.error("Erro ao excluir Mesa Diretora:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }
 
}

export default MesaDiretora;
