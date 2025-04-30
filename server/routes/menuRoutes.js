// server/routes/menuRoutes.js
import express from 'express';
import { MENU_MAP } from '../utils/menu.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/menu', async (req, res) => {
    const authHeader = req.headers.authorization?.split(' ')[1];
    const payload = verifyToken(authHeader);
    if (!payload) return res.status(401).json({ message: 'Token inválido' });
  
    // Busca as roles reais do usuário no banco
    const [rows] = await pool.query(
      `SELECT r.role_name
         FROM user_permissions up
         JOIN roles r ON up.role_id = r.id
        WHERE up.user_id = ?`,
      [payload.id]
    );
  
    const roles = rows.map(r => r.role_name);
    // Junta os menus de todas as roles
    const items = roles.reduce((acc, role) => {
      const m = MENU_MAP[role] || [];
      return acc.concat(m);
    }, []);
  
    return res.json({ menu: items });
});

export default router;


