import pool from "../config/db.js";

class Cargo {
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM Cargos");
    console.log(rows);
    return rows;
  }

  static async create(nome) {
    const [result] = await pool.query("INSERT INTO Cargos (nome) VALUES (?)", [nome]);
    return result.insertId;
  }
}

export default Cargo;