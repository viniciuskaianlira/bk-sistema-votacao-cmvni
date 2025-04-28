import { WebSocketServer } from 'ws';

function setupWebSocket(server) {
    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
        console.log('Novo vereador conectado ao WebSocket');

        ws.on('message', (message) => {
            console.log(`Mensagem recebida: ${message}`);

            // Broadcast para todos os clientes conectados
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('Conexão encerrada');
        });
    });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    console.log('Servidor WebSocket iniciado.');
}

export { setupWebSocket };
