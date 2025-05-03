-- 1) Criação das tabelas (sem duplicações e sem ALTERs desnecessários)

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE user_permissions (
  user_id INT,
  role_id INT,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
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
  legislatura_id INT NOT NULL,
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
  ano_legislatura ENUM('1','2','3','4') NOT NULL,
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
  tipo ENUM('ORDINÁRIA','EXTRAORDINÁRIA','SOLENE','PÚBLICA') NOT NULL DEFAULT 'ORDINÁRIA',
  presidida_id INT,
  FOREIGN KEY (presidida_id) REFERENCES vereadores(id)
);

CREATE TABLE presenca_sessoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sessao_id INT,
  vereador_id INT,
  data_registro DATETIME,
  FOREIGN KEY (sessao_id)   REFERENCES sessao_legislativa(id),
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id)
);

CREATE TABLE protocolo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo_protocolo ENUM(
    'Projeto de Resolução','Projeto de Lei Ordinária','Projeto de Decreto Legislativo',
    'Projeto de Emenda à Lei Orgânica','Projeto de Lei Complementar',
    'Moção','Indicação','Vetos','Requerimento'
  ) NOT NULL,
  data_protocolo DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historico_protocolo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  protocolo_id INT,
  status ENUM(
    'Aguardando','Pautado','Em Tramitação','Em Primeira Votação','Em Segunda Votação',
    'Em Redação Final','Pedido de Vista','Aprovado','Rejeitado','Cancelado'
  ) DEFAULT 'Aguardando',
  data_status DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (protocolo_id) REFERENCES protocolo(id)
);

CREATE TABLE indicacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  texto LONGTEXT NOT NULL,
  justificativa LONGTEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT,
  promponente_id INT,
  protocolo_id INT,
  FOREIGN KEY (usuario_id)     REFERENCES users(id),
  FOREIGN KEY (promponente_id)  REFERENCES vereadores(id),
  FOREIGN KEY (protocolo_id)    REFERENCES protocolo(id)
);

CREATE TABLE indicacao_proponentes (
  indicacao_id INT,
  vereador_id    INT,
  PRIMARY KEY (indicacao_id,vereador_id),
  FOREIGN KEY (indicacao_id) REFERENCES indicacoes(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id)   REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE indicacao_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  indicacao_id INT,
  arquivo_pdf  LONGBLOB NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  data_upload  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (indicacao_id) REFERENCES indicacoes(id) ON DELETE CASCADE
);

CREATE TABLE tipo_projeto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo_projeto VARCHAR(255) NOT NULL
);

CREATE TABLE projeto (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  ementa LONGTEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT,
  protocolo_id INT,
  tipo_projeto_id INT,
  projeto_executivo BOOLEAN NOT NULL,
  FOREIGN KEY (usuario_id)       REFERENCES users(id),
  FOREIGN KEY (protocolo_id)     REFERENCES protocolo(id),
  FOREIGN KEY (tipo_projeto_id)  REFERENCES tipo_projeto(id)
);

CREATE TABLE projeto_proponentes (
  projeto_id  INT,
  vereador_id INT,
  PRIMARY KEY (projeto_id,vereador_id),
  FOREIGN KEY (projeto_id)  REFERENCES projeto(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE projeto_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  projeto_id   INT,
  arquivo_pdf  LONGBLOB NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  data_upload  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projeto(id) ON DELETE CASCADE
);

DELIMITER //
CREATE TRIGGER before_insert_proponente
BEFORE INSERT ON projeto_proponentes
FOR EACH ROW
BEGIN
  DECLARE is_executivo BOOLEAN;
  SELECT projeto_executivo 
    INTO is_executivo 
    FROM projeto 
    WHERE id = NEW.projeto_id;
  IF is_executivo THEN
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
  ementa LONGTEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT,
  protocolo_id INT,
  tipo_proposicao_id INT,
  projeto_executivo BOOLEAN NOT NULL,
  FOREIGN KEY (usuario_id)          REFERENCES users(id),
  FOREIGN KEY (protocolo_id)        REFERENCES protocolo(id),
  FOREIGN KEY (tipo_proposicao_id)  REFERENCES tipo_proposicao(id)
);

CREATE TABLE proposicao_proponentes (
  proposicao_id INT,
  vereador_id   INT,
  PRIMARY KEY (proposicao_id,vereador_id),
  FOREIGN KEY (proposicao_id) REFERENCES proposicao(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id)   REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE proposicao_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  proposicao_id INT,
  arquivo_pdf   LONGBLOB NOT NULL,
  nome_arquivo  VARCHAR(255) NOT NULL,
  data_upload   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proposicao_id) REFERENCES proposicao(id) ON DELETE CASCADE
);

CREATE TABLE tipo_ato (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tipo VARCHAR(255) NOT NULL
);

CREATE TABLE ato (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id INT NOT NULL,
  tipo_ato_id INT NOT NULL,
  protocolo_id INT NOT NULL,
  FOREIGN KEY (usuario_id)    REFERENCES users(id),
  FOREIGN KEY (protocolo_id)  REFERENCES protocolo(id),
  FOREIGN KEY (tipo_ato_id)   REFERENCES tipo_ato(id)
);

CREATE TABLE ato_proponentes (
  ato_id      INT,
  vereador_id INT,
  PRIMARY KEY (ato_id,vereador_id),
  FOREIGN KEY (ato_id)      REFERENCES ato(id) ON DELETE CASCADE,
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE
);

CREATE TABLE ato_arquivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ato_id       INT,
  arquivo_pdf  LONGBLOB NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  data_upload  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ato_id) REFERENCES ato(id) ON DELETE CASCADE
);

CREATE TABLE oficios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  destino VARCHAR(255) NOT NULL,
  arquivo_pdf LONGBLOB NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  data_upload  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  para_executivo BOOLEAN,
  data_recebimento_executivo DATETIME
);

CREATE TABLE oficios_recebidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero INT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  origem VARCHAR(255) NOT NULL,
  arquivo_pdf LONGBLOB NOT NULL,
  nome_arquivo VARCHAR(255) NOT NULL,
  data_upload  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  oficio_executivo BOOLEAN,
  data_recebimento DATETIME
);

CREATE TABLE votos_projeto (
  vereador_id INT,
  projeto_id  INT,
  voto ENUM('FAVORÁVEL','CONTRÁRIO','ABSTENÇÃO','AUSENTE') NOT NULL,
  data_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vereador_id,projeto_id),
  FOREIGN KEY (vereador_id) REFERENCES vereadores(id) ON DELETE CASCADE,
  FOREIGN KEY (projeto_id)  REFERENCES projeto(id) ON DELETE CASCADE
);

CREATE TABLE votos_indicacao (
  vereador_id   INT,
  indicacao_id  INT,
  voto ENUM('FAVORÁVEL','CONTRÁRIO','ABSTENÇÃO','AUSENTE') NOT NULL,
  data_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vereador_id,indicacao_id),
  FOREIGN KEY (vereador_id)  REFERENCES vereadores(id) ON DELETE CASCADE,
  FOREIGN KEY (indicacao_id) REFERENCES indicacoes(id) ON DELETE CASCADE
);

CREATE TABLE votos_proposicao (
  vereador_id    INT,
  proposicao_id  INT,
  voto ENUM('FAVORÁVEL','CONTRÁRIO','ABSTENÇÃO','AUSENTE') NOT NULL,
  data_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (vereador_id,proposicao_id),
  FOREIGN KEY (vereador_id)    REFERENCES vereadores(id) ON DELETE CASCADE,
  FOREIGN KEY (proposicao_id)  REFERENCES proposicao(id) ON DELETE CASCADE
);

-- 2) Tabela de Cargos
CREATE TABLE Cargos (
  IdCargo INT AUTO_INCREMENT PRIMARY KEY,
  NomeCargo VARCHAR(100) NOT NULL,
  NivelAcesso INT NOT NULL,
  Descricao TEXT,
  Ativo BOOLEAN DEFAULT TRUE,
  DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  DataAtualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3) Inserts iniciais

INSERT INTO roles (role_name) VALUES 
  ('admin'),('presidente'),('vice-presidente'),
  ('primeiro-secretario'),('segundo-secretario'),
  ('vereador'),('servidor'),('publico'),('executivo');

-- Admin e captura de ID
INSERT INTO users (nome, username, password, ativo)
VALUES ('Administrador','admin','$2a$12$tnd/M2PNpOWMuw5CO.v2BeHV//Tq3bOfLMeOCVlLwwqxyUfbI2x4S',TRUE);
SET @admin_id = LAST_INSERT_ID();

-- Outros 9 usuários (IDs 3 a 11)
INSERT INTO users (nome, username, password, ativo) VALUES
  ('João Silva','joaosilva','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Maria Oliveira','moliveira','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Pedro Souza','psouza','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Ana Lima','alima','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Bruno Ferreira','bferreira','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Carla Santos','csantos','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Diego Costa','dcosta','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Fernanda Rocha','frocha','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE),
  ('Rafael Almeida','ralmeida','$2a$12$xLt1tqHT8MW6auINrHTgpOolILI47dNJHn7XdeM6M1ujmbIimjWwy',TRUE);

-- Permissão de admin
SET @role_admin = (SELECT id FROM roles WHERE role_name='admin' LIMIT 1);
INSERT INTO user_permissions (user_id, role_id) VALUES (@admin_id, @role_admin);

-- Cargos
INSERT INTO Cargos (NomeCargo,NivelAcesso,Descricao) VALUES
  ('Presidente da Câmara',1,'Responsável por dirigir os trabalhos legislativos e administrativos'),
  ('Vereador',2,'Membro do legislativo municipal, com direito a voto nas sessões'),
  ('Secretário',2,'Responsável por secretariar as sessões e os trabalhos legislativos');

-- Senha do root
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('Camara2022/');
ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('Camara2022/');

-- Legislatura e vereadores
INSERT INTO legislatura (numero,data_inicio,data_fim)
 VALUES (9,'2025-01-01','2028-12-31');
INSERT INTO vereadores (user_id,legislatura_id,partido,sigla_partido)
 VALUES (1,1,'Partido Exemplar','PEX');

-- Sessões legislativas
INSERT INTO sessao_legislativa (numero,data_sessao,tipo,presidida_id) VALUES
  (1,'2025-05-05 14:00:00','ORDINÁRIA',1),
  (2,'2025-05-12 14:00:00','EXTRAORDINÁRIA',1),
  (3,'2025-05-19 14:00:00','SOLENE',1),
  (4,'2025-05-26 14:00:00','PÚBLICA',1),
  (5,'2025-06-02 14:00:00','ORDINÁRIA',1),
  (6,'2025-06-09 14:00:00','EXTRAORDINÁRIA',1),
  (7,'2025-06-16 14:00:00','SOLENE',1),
  (8,'2025-06-23 14:00:00','PÚBLICA',1),
  (9,'2025-06-30 14:00:00','ORDINÁRIA',1),
  (10,'2025-07-07 14:00:00','ORDINÁRIA',1);

-- Atualização de senha do admin (opcional, se quiser sobrescrever)
UPDATE users
SET password = '$2a$10$g1OoSZum0ZWrve8aDIzY2O45M9shXY1khr8He3kVZtPTk5J52Gs/2'
WHERE username = 'admin';
```
