require('dotenv').config();
const app = require('./src/app');
const { setupDatabase } = require('./src/config/database');
const { logger } = require('./src/middleware/logger');

const PORT = process.env.PORT || 3000;

// Função assíncrona para garantir o setup do banco 
const startServer = async () => {
    try {
        await setupDatabase(); // Cria banco e tabelas se não existirem
        
        app.listen(PORT, () => {
            logger.info(`Servidor rodando em http://localhost:${PORT}`);
            logger.info(`Documentação disponível em http://localhost:${PORT}/docs`);
        });
    } catch (error) {
        logger.error("Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
};

startServer();