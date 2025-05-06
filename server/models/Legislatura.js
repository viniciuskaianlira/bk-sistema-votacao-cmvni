import { pool } from '../config/db.js'

class Legislatura {

    static async create(numero, data_inicio, data_fim) {
        try {
            const [result] = await pool.query(
                "INSERT INTO legislatura (numero, data_inicio, data_fim) VALUES (?, ?, ?)",
                [numero, data_inicio, data_fim]
            );
    
            return result.insertId;
        } catch (error) {
            console.error("Erro ao inserir uma legislatura:", error);
            return { success: false, message: "Erro no servidor." };
        }
    }

    static async read(id = null) {
        try {
            let query = "SELECT * FROM legislatura";
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

    static async readByIdUser(userId) {
        const sql = `
          SELECT l.id,
                 l.numero,
                 l.data_inicio,
                 l.data_fim
          FROM legislatura AS l
          INNER JOIN vereadores AS v
            ON v.legislatura_id = l.id
          WHERE v.user_id = ?
          ORDER BY l.data_inicio DESC
        `
        const [rows] = await pool.query(sql, [userId])
        return rows
    }

    static async update(id, numero = null, data_inicio = null, data_fim = null) {
            try {
                // 📌 Verifica se já existe uma legislatura com o mesmo número
                if (numero !== null) {
                    const [existingLegislatura] = await pool.query(
                        "SELECT id FROM legislatura WHERE numero = ? AND id <> ?",
                        [numero, id]
                    );

                    if (existingLegislatura.length > 0) {
                        return { success: false, message: "Legislatura já cadastrada no sistema!" };
                    }
                }

                // 📌 Monta a query de atualização
                let query = "UPDATE legislatura SET ";
                let values = [];
                let updates = [];

                if (numero !== null) {
                    updates.push("numero = ?");
                    values.push(numero);
                }
                if (data_inicio !== null) {
                    updates.push("data_inicio = ?");
                    values.push(data_inicio);
                }
                if (data_fim !== null) {
                    updates.push("data_fim = ?");
                    values.push(data_fim);
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
                    return { success: true, message: "Legislatura atualizada com sucesso!" };
                } else {
                    return { success: false, message: "Nenhuma alteração feita." };
                }
            } catch (error) {
                console.error("Erro ao atualizar:", error);
                return { success: false, message: "Erro no servidor." };
            }
        }

 
}

export default Legislatura;
