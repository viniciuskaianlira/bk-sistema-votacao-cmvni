import express from 'express';
import { generateToken, comparePassword } from './auth.js';
import { pool } from './db.js'; // Aqui você importa a conexão com o banco

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Busca o usuário no banco de dados
  const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

  if (user && comparePassword(password, user.password)) {
    // Se o usuário for válido, gera o token
    const token = generateToken(user);
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

export default router;
