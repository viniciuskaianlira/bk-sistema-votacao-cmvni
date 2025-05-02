import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import { setupWebSocket } from "./websocket.js";

import loginRoutes from "./routes/loginRoutes.js";
import cargoRoutes from "./routes/cargoRoutes.js";
import sessaoRoutes from "./routes/sessaoRoutes.js";
import votingRoutes from './routes/votingRoutes.js'; // Rota exemplo de autenticação e permissão;
import vereadorRoutes from './routes/vereadorRoutes.js';

import menuRoutes from './routes/menuRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rotas REST
app.use('/api', loginRoutes);
app.use('/api', menuRoutes);
app.use('/api/voting', votingRoutes);
app.use("/api/cargos", cargoRoutes);
app.use("/api/sessao_legislativa", sessaoRoutes);
app.use("/api", vereadorRoutes);

// Inicializa WebSockets
setupWebSocket(server);

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});