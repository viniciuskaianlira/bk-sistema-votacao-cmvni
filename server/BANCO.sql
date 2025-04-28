CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,  -- Adicionado UNIQUE para evitar duplicação
  password VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE user_permissions (
  user_id INT,
  role_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE legislatura (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL UNIQUE,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL
);

CREATE TABLE vereadores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  legislatura_id INT NOT NULL,  -- Adiciona a referência à legislatura
  partido VARCHAR(255) NOT NULL,
  sigla_partido VARCHAR(10) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (legislatura_id) REFERENCES legislatura(id) ON DELETE CASCADE
);

CREATE TABLE mesa_diretora (
  id INT PRIMARY KEY AUTO_INCREMENT,
  legislatura_id INT,
  presidente_id INT,
  vice_presidente INT,
  primeiro_secretario INT,
  segundo_secretario INT,
  ano_legislatura ENUM('1', '2', '3', '4') NOT NULL,
  FOREIGN KEY (legislatura_id) REFERENCES legislatura(id),
  FOREIGN KEY (presidente_id) REFERENCES vereadores(id),
  FOREIGN KEY (vice_presidente) REFERENCES vereadores(id),
  FOREIGN KEY (primeiro_secretario) REFERENCES vereadores(id),
  FOREIGN KEY (segundo_secretario) REFERENCES vereadores(id)
);

CREATE TABLE sessao_legislativa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT,
  data_sessao DATETIME,
  tipo ENUM('ORDINÁRIA', 'EXTRAORDINÁRIA', 'SOLENE', 'PÚBLICA') NOT NULL DEFAULT 'ORDINÁRIA',
  presidida_id INT, -- PRESIDENTE OU VICE-PRESIDENTE DA MESA DIRETORA DO ANO ATUAL
  FOREIGN KEY (presidida_id) REFERENCES vereadores(id)
);

CREATE TABLE presenca_sessoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sessao_id INT,
  vereador_id INT,
  data_registro DATETIME,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id),
  FOREIGN KEY (sessao_id) REFERENCES sessao_legislativa(id)
);

CREATE TABLE protocolo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo_protocolo ENUM('Projeto de Resolução', 'Projeto de Lei Ordinária', 'Projeto de Decreto Legislativo', 'Projeto de Emenda à Lei Orgânica', 'Projeto de Lei Complementar', 'Moção', 'Indicação', 'Vetos', 'Requirimento') NOT NULL,
  data_protocolo DATETIME DEFAULT CURRENT_TIMESTAMP  -- Data de protocolo
);

CREATE TABLE historico_protocolo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  protocolo_id INT,
  status ENUM('Aguardando', 'Pautado', 'Em Tramitação', 'Em Primeira Votação', 'Em Segunda Votação', 'Em Redação Final', 'Pedido de Vista', 'Aprovado', 'Rejeitado', 'Cancelado') DEFAULT 'Aguardando',  -- Status do projeto
  data_status DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Data de protocolo
  FOREIGN KEY (protocolo_id) REFERENCES protocolo(id)
);

CREATE TABLE indicacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  texto LONGTEXT NOT NULL,              -- Texto da indicação
  justificativa LONGTEXT NOT NULL,      -- Justificativa da indicação
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da criação
  usuario_id INT,                       -- ID do usuário que criou a indicação
  promponente_id INT,                   -- VEREADOR O QUAL ESTÁ FAZENDO A INDICAÇÃO
  protocolo_id INT,
  FOREIGN KEY (usuario_id) REFERENCES users(id),
  FOREIGN KEY (promponente_id) REFERENCES vereadores(id),
  FOREIGN KEY (protocolo_id) REFERENCES protocolo(id)
);

CREATE TABLE indicacao_proponentes (
  indicacao_id INT,
  vereador_id INT,
  PRIMARY KEY (indicacao_id, vereador_id),
  FOREIGN KEY (indicacao_id) REFERENCES indicacoes(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE indicacao_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  indicacao_id INT,                     -- Relaciona o arquivo ao projeto
  arquivo_pdf LONGBLOB NOT NULL,       -- Arquivo em formato binário
  nome_arquivo VARCHAR(255) NOT NULL,  -- Nome original do arquivo
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data do upload
  FOREIGN KEY (indicacao_id) REFERENCES indicacoes(id) ON DELETE CASCADE
);

CREATE TABLE tipo_projeto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo_projeto VARCHAR(255) NOT NULL
);

CREATE TABLE projeto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  ementa LONGTEXT NOT NULL,              -- Texto da indicação
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da criação
  usuario_id INT,                       -- ID do usuário que criou a indicação
  protocolo_id INT,
  tipo_projeto_id INT,
  projeto_executivo BOOLEAN NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES users(id),
  FOREIGN KEY (protocolo_id) REFERENCES protocolo(id),
  FOREIGN KEY (tipo_projeto_id) REFERENCES tipo_projeto(id)
);

CREATE TABLE projeto_proponentes (
  projeto_id INT,
  vereador_id INT,
  PRIMARY KEY (projeto_id, vereador_id),
  FOREIGN KEY (projeto_id) REFERENCES projeto(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE projeto_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  projeto_id INT,                     -- Relaciona o arquivo ao projeto
  arquivo_pdf LONGBLOB NOT NULL,       -- Arquivo em formato binário
  nome_arquivo VARCHAR(255) NOT NULL,  -- Nome original do arquivo
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data do upload
  FOREIGN KEY (projeto_id) REFERENCES projeto(id) ON DELETE CASCADE
);

DELIMITER //
CREATE TRIGGER before_insert_proponente
BEFORE INSERT ON projeto_proponentes
FOR EACH ROW
BEGIN
    DECLARE is_executivo BOOLEAN;

    -- Verifica se o projeto é do executivo
    SELECT projeto_executivo INTO is_executivo 
    FROM projeto 
    WHERE id = NEW.projeto_id;

    -- Se for do executivo, bloqueia a inserção
    IF is_executivo = TRUE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro: Projetos do executivo não podem ter vereadores como proponentes!';
    END IF;
END;
//
DELIMITER ;

CREATE TABLE tipo_proposicao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(255) NOT NULL
);

CREATE TABLE proposicao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  ementa LONGTEXT NOT NULL,              -- Texto da indicação
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da criação
  usuario_id INT,                       -- ID do usuário que criou a indicação
  protocolo_id INT,
  tipo_proposicao_id INT,
  projeto_executivo BOOLEAN NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES users(id),
  FOREIGN KEY (protocolo_id) REFERENCES protocolo(id),
  FOREIGN KEY (tipo_proposicao_id) REFERENCES tipo_proposicao(id)
);

CREATE TABLE proposicao_proponentes (
  proposicao_id INT,
  vereador_id INT,
  PRIMARY KEY (proposicao_id, vereador_id),
  FOREIGN KEY (proposicao_id) REFERENCES proposicao(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE proposicao_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  proposicao_id INT,                     -- Relaciona o arquivo ao projeto
  arquivo_pdf LONGBLOB NOT NULL,       -- Arquivo em formato binário
  nome_arquivo VARCHAR(255) NOT NULL,  -- Nome original do arquivo
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data do upload
  FOREIGN KEY (proposicao_id) REFERENCES proposicao(id) ON DELETE CASCADE
);

CREATE TABLE tipo_ato (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(255) NOT NULL
);

CREATE TABLE ato (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data e hora da criação
  usuario_id INT NOT NULL,                       -- ID do usuário que criou a indicação
  tipo_ato_id INT NOT NULL,
  protocolo_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES users(id),
  FOREIGN KEY (protocolo_id) REFERENCES protocolo(id),
  FOREIGN KEY (tipo_ato_id) REFERENCES tipo_ato(id)
);

CREATE TABLE ato_proponentes (
  ato_id INT,
  vereador_id INT,
  PRIMARY KEY (ato_id, vereador_id),
  FOREIGN KEY (ato_id) REFERENCES ato(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE ato_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ato_id INT,                     -- Relaciona o arquivo ao projeto
  arquivo_pdf LONGBLOB NOT NULL,       -- Arquivo em formato binário
  nome_arquivo VARCHAR(255) NOT NULL,  -- Nome original do arquivo
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data do upload
  FOREIGN KEY (ato_id) REFERENCES ato(id) ON DELETE CASCADE
);

CREATE TABLE oficios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  destino VARCHAR(255) NOT NULL,
  arquivo_pdf LONGBLOB NOT NULL,       -- Arquivo em formato binário
  nome_arquivo VARCHAR(255) NOT NULL,  -- Nome original do arquivo
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data do upload
  para_executivo BOOLEAN,
  data_recebimento_executivo DATETIME
);

CREATE TABLE oficios_recebidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  origem VARCHAR(255) NOT NULL,
  arquivo_pdf LONGBLOB NOT NULL,       -- Arquivo em formato binário
  nome_arquivo VARCHAR(255) NOT NULL,  -- Nome original do arquivo
  data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data do upload
  oficio_executivo BOOLEAN,
  data_recebimento DATETIME
);

CREATE TABLE votos_projeto (
  vereador_id INT,
  projeto_id INT,
  voto ENUM('FAVORÁVEL', 'CONTRÁRIO', 'ABSTENÇÃO', 'AUSENTE') NOT NULL,
  data_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vereador_id, projeto_id),
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE,
  FOREIGN KEY (projeto_id) REFERENCES projeto(id) ON DELETE CASCADE
);

CREATE TABLE votos_indicacao (
  vereador_id INT,
  indicacao_id INT,
  voto ENUM('FAVORÁVEL', 'CONTRÁRIO', 'ABSTENÇÃO', 'AUSENTE') NOT NULL,
  data_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vereador_id, indicacao_id),
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE,
  FOREIGN KEY (indicacao_id) REFERENCES indicacoes(id) ON DELETE CASCADE
);

CREATE TABLE votos_proposicao (
  vereador_id INT,
  proposicao_id INT,
  voto ENUM('FAVORÁVEL', 'CONTRÁRIO', 'ABSTENÇÃO', 'AUSENTE') NOT NULL,
  data_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vereador_id, proposicao_id),
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE,
  FOREIGN KEY (proposicao_id) REFERENCES proposicao(id) ON DELETE CASCADE
);


INSERT INTO roles (role_name) VALUES 
('admin'),
('presidente'),
('vice-presidente'),
('primeiro-secretario'),
('segundo-secretario'),
('vereador'),
('servidor'),
('publico'),
('executivo');

-- Inserindo o usuário admin
INSERT INTO users (nome, username, password, ativo) 
VALUES ('Administrador', 'admin', '$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy', TRUE);

-- Obtendo o ID do usuário admin recém-criado
SET @admin_id = LAST_INSERT_ID();

-- Obtendo o ID da role admin
SET @role_admin = (SELECT id FROM roles WHERE role_name = 'admin' LIMIT 1);

-- Associando o usuário admin à role admin
INSERT INTO user_permissions (user_id, role_id) 
VALUES (@admin_id, @role_admin);

ALTER TABLE legislatura ADD COLUMN numero INT NOT NULL UNIQUE;

ALTER TABLE vereadores ADD COLUMN legislatura_id INT NOT NULL;
ALTER TABLE vereadores ADD FOREIGN KEY (legislatura_id) REFERENCES legislatura(id) ON DELETE CASCADE;


CREATE TABLE Cargos (
    IdCargo INT AUTO_INCREMENT PRIMARY KEY,
    NomeCargo VARCHAR(100) NOT NULL,
    NivelAcesso INT NOT NULL,
    Descricao TEXT,
    Ativo BOOLEAN DEFAULT TRUE,
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DataAtualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Cargos (NomeCargo, NivelAcesso, Descricao) VALUES
('Presidente da Câmara', 1, 'Responsável por dirigir os trabalhos legislativos e administrativos'),
('Vereador', 2, 'Membro do legislativo municipal, com direito a voto nas sessões'),
('Secretário', 2, 'Responsável por secretariar as sessões e os trabalhos legislativos');



SET PASSWORD FOR 'root'@'localhost' = PASSWORD('Camara2022/');
ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('Camara2022/');