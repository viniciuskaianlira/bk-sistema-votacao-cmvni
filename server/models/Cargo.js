import pool from "../config/db.js";

class Cargo {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM cargos");
    return rows;
  }

  static async create(nome) {
    const [result] = await pool.query("INSERT INTO cargos (nome) VALUES (?)", [nome]);
    return result.insertId;
  }
}

export default Cargo;