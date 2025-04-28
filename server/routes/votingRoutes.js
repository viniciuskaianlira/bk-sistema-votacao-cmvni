import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js'; // Importa os middlewares de autenticação e autorização

const router = express.Router();

// Rota acessível apenas para administradores
router.post('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Bem-vindo, administrador!' });
});

// Rota acessível apenas para vereadores e presidente
router.post('/votacao', authenticate, authorize(['vereador', 'presidente']), (req, res) => {
  res.json({ message: 'Votação iniciada!' });
});

export default router;