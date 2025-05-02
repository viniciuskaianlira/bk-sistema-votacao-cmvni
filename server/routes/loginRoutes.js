import express from 'express';
import { generateToken, comparePassword } from '../middleware/auth.js';
import { pool } from '../config/db.js'

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users u JOIN user_permissions up ON up.user_id = u.id JOIN roles r ON r.id = up.role_id WHERE u.username = ?;', [username]);
    const user = rows[0];
    // loginRoutes.js
    if (user && comparePassword(password, user.password)) {
      // user.role deve vir do DB: ex: rows[0].role_name
      const token = generateToken({ id: user.id, role: user.role_name });
      return res.json({ token, user: { id: user.id, username: user.username, nome: user.nome, role: user.role_name } });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

export default router;



