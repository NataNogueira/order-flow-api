require('dotenv').config();
const app = require('./src/app');
const { setupDatabase } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Função assíncrona para garantir o setup do banco 
const startServer = async () => {
    try {
        await setupDatabase(); // Cria banco e tabelas se não existirem
        
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Falha ao iniciar o servidor:", error);
        process.exit(1);
    }
};

startServer();