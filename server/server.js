import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import { setupWebSocket } from "./websocket.js";
// import authRoutes from './routes/authRoutes.js';

import cargoRoutes from "./routes/cargoRoutes.js";

import votingRoutes from './routes/votingRoutes.js'; // Rota exemplo de autenticação e permissão;


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rotas REST
// app.use('/api/auth', authRoutes);
app.use('/api/voting', votingRoutes);
app.use("/api/cargos", cargoRoutes);

// Inicializa WebSockets
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});