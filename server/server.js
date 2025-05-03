import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import { setupWebSocket } from "./websocket.js";

import atoArquivosRoutes from './routes/atoArquivosRoutes.js';
import atoProponentesRoutes from './routes/atoProponentesRoutes.js';
import atoRoutes from './routes/atoRoutes.js';
import cargoRoutes from "./routes/cargoRoutes.js";
import historicoProtocoloRoutes from './routes/historicoProtocoloRoutes.js';
import indicacaoProponenteRoutes from './routes/indicacaoProponenteRoutes.js';
import indicacaoRoutes from './routes/indicacaoRoutes.js';
import legislaturaRoutes from './routes/legislaturaRoutes.js';
import loginRoutes from "./routes/loginRoutes.js";
import menuRoutes from './routes/menuRoutes.js';
import mesaDiretoraRoutes from './routes/mesaDiretoraRoutes.js';
import oficiosRecebidosRoutes from './routes/oficiosRecebidosRoutes.js';
import oficiosRoutes from './routes/oficiosRoutes.js';
import presencaSessaoRoutes from './routes/presencaSessaoRoutes.js';
import projetoArquivosRoutes from './routes/projetoArquivosRoutes.js';
import projetoRoutes from './routes/projetoRoutes.js';
import protocoloRoutes from './routes/protocoloRoutes.js';
import sessaoRoutes from "./routes/sessaoRoutes.js";
import tipoAtoRoutes from './routes/tipoAtoRoutes.js';
import tipoProjetoRoutes from './routes/tipoProjetoRoutes.js';
import userPermissionsRoutes from './routes/userPermissionsRoutes.js';
import vereadorRoutes from './routes/vereadorRoutes.js';
import votingRoutes from './routes/votingRoutes.js'; 
import votosIndicacaoRoutes from './routes/votosIndicacaoRoutes.js';
import votosProjetoRoutes from './routes/votosProjetoRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rotas REST
app.use("/api", atoArquivosRoutes);
app.use("/api", atoProponentesRoutes);
app.use("/api", atoRoutes);
app.use("/api", cargoRoutes);
app.use("/api", historicoProtocoloRoutes);
app.use("/api", indicacaoProponenteRoutes);
app.use("/api", indicacaoRoutes);
app.use("/api", legislaturaRoutes);
app.use("/api", loginRoutes);
app.use("/api", menuRoutes);
app.use("/api", mesaDiretoraRoutes);
app.use("/api", oficiosRecebidosRoutes);
app.use("/api", oficiosRoutes);
app.use("/api", presencaSessaoRoutes);
app.use("/api", projetoArquivosRoutes);
app.use("/api", projetoRoutes);
app.use("/api", protocoloRoutes);
app.use("/api", sessaoRoutes);
app.use("/api", tipoAtoRoutes);
app.use("/api", tipoProjetoRoutes);
app.use("/api", userPermissionsRoutes);
app.use("/api", vereadorRoutes);
app.use("/api", votingRoutes);
app.use("/api", votosIndicacaoRoutes);
app.use("/api", votosProjetoRoutes);

// Inicializa WebSockets
setupWebSocket(server);

// const PORT = process.env.PORT || 3000;
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});