import express from "express";
import IndicacaoArquivoController from "../controllers/indicacaoArquivoController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import multer from "multer";

// Configuração do multer para upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Criar um novo arquivo para uma indicação (upload)
router.post("/indicacao_arquivo", authenticate, authorize(['admin', 'servidor', 'vereador']), upload.single('arquivo_pdf'), IndicacaoArquivoController.create);

// Ler os arquivos de uma indicação específica
router.get("/indicacao_arquivo", authenticate, authorize(['admin', 'servidor', 'vereador']), IndicacaoArquivoController.read);

// Excluir um arquivo de uma indicação específica
router.delete("/indicacao_arquivo/:id", authenticate, authorize(['admin', 'servidor']), IndicacaoArquivoController.delete);

router.get("/indicacao_arquivos/visualizar/:id", authenticate, authorize(['admin', 'servidor', 'presidente', 'vice-presidente', 'primeiro-secretario', 'segundo-secretario', 'vereador', 'executivo']), IndicacaoArquivoController.visualizar);

export default router;
