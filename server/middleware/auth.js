import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secreta_chave';

// Geração do Token - Agora só com o ID do usuário
export const generateToken = (user) => {
  // Agora incluímos também o role no payload
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Verificação do Token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // Se o token for inválido, retorna null
  }
};

// Função para hash de senha
export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Função para comparar senha
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};


