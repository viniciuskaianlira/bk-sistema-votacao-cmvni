import { verifyToken } from './auth.js';

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado' });
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req.user = decoded; // Armazena as informações do usuário no objeto da requisição
  next();
};

// Middleware de autorização (verifica se o usuário tem permissão baseada no banco)
export const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; // Supondo que o ID do usuário está no req.user.id
      const query = `
        SELECT roles.role_name 
        FROM user_permissions
        JOIN roles ON user_permissions.role_id = roles.id
        WHERE user_permissions.user_id = ?
      `;
      
      // Executa a consulta ao banco para obter as permissões do usuário
      const [rows] = await db.execute(query, [userId]);
      
      if (rows.length === 0) {
        return res.status(403).json({ message: 'Permissões não encontradas para este usuário' });
      }

      const userRoles = rows.map(row => row.role_name); // Mapeia os nomes das roles que o usuário possui

      // Verifica se o usuário possui pelo menos uma das permissões requeridas
      const hasPermission = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasPermission) {
        return res.status(403).json({ message: 'Permissão negada' });
      }

      next(); // Usuário tem permissão, continua para a próxima função
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor ao verificar permissões' });
    }
  };
};
