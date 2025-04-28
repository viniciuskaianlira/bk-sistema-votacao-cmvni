votacao-camara/
│── 📁 server/            # Código do backend (Node.js + Express + WebSockets)
│   ├── 📁 controllers/   # Lógica de controle das requisições
│   ├── 📁 models/        # Modelos do banco de dados
│   ├── 📁 routes/        # Rotas da API REST
│   ├── 📁 services/      # Serviços auxiliares (WebSocket, Relatórios, etc.)
│   ├── server.js        # Servidor Node.js (Express + WebSockets)
│   ├── database.js      # Configuração do banco de dados
│   ├── websocket.js     # Gerenciamento dos WebSockets
│── 📁 client/            # Frontend (Vue.js)
│   ├── 📁 public/        # Arquivos estáticos
│   ├── 📁 src/           # Código-fonte Vue.js
│   │   ├── 📁 components/ # Componentes Vue (Botões, Painéis, etc.)
│   │   ├── 📁 pages/      # Páginas principais (Dashboard, Votação, Histórico)
│   │   ├── 📁 store/      # Gerenciamento de estado (Pinia/Vuex)
│   │   ├── 📁 router/ # Configuração das rotas Vue Router
            │── index.js   # Arquivo principal de configuração
            │── routes.js  # Lista de rotas separada
            │── guards.js  # Middlewares (ex: verificar login)
│   │   ├── App.vue       # Componente principal Vue
│   │   ├── main.js       # Arquivo de inicialização do Vue
│   ├── index.html       # Página de entrada do Vue
│── 📁 logs/              # Logs do sistema
│── 📁 reports/           # Relatórios gerados
│── .env                  # Variáveis de ambiente
│── package.json          # Dependências e scripts do projeto
│── README.md             # Documentação do projeto


Cadastros:
1 - Cargos - OK
2 - Legislatura - OK
3 - Mesa diretora - OK
4 - Vereadores - OK
5 - Sessões - 
6 - indicações
7 - Projetos de resolução
8 - Projeto de Lei do Legislativo
9 - Projeto de Decreto Legislativo
10 - Projeto de Lei Ordinária
11 - Projeto de Complementares
12 - Projeto de emenda lei orgânica
13 - Proposições
	|-- Moções
	|-- Requerimento
14 - Postaria Legislativa
15 - Protocolo
