import express from 'express';
import { generateToken, comparePassword } from '../middleware/auth.js';
import pool from '../config/db.js'; // Corrigido para não usar destructuring se estiver usando export default

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    // loginRoutes.js
    if (user && comparePassword(password, user.password)) {
      // user.role deve vir do DB: ex: rows[0].role_name
      const token = generateToken({ id: user.id, role: user.role_name });
      return res.json({ token, user: { id: user.id, username: user.username, role: user.role_name } });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

export default router;



