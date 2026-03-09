const { Pool } = require('pg');
require('dotenv').config();

// Configuração para o banco específico do desafio
const dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, // order-flow-api
    password: process.env.DB_PASS,
    port: process.env.DB_PORT, // 3000
});

// Cria uma conexão temporária para criar o banco da API caso não tenha
const setupDatabase = async () => {
    const adminPool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'postgres',
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
    });

    try {
        const dbName = process.env.DB_NAME;
        const checkDb = await adminPool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (checkDb.rowCount === 0) {
            console.log(`Criando banco de dados ${dbName}...`);
            await adminPool.query(`CREATE DATABASE "${dbName}"`);
        }
    } catch (erro) {
        console.error("Erro ao checar/criar banco de dados:", erro);
    } finally {
        await adminPool.end();
    }

    // Cria as tabelas no banco da aplicação, caso também não tenha
    const tableQuery = `
        CREATE TABLE IF NOT EXISTS "Order" (
            "orderId" VARCHAR(50) PRIMARY KEY,
            "value" NUMERIC NOT NULL,
            "creationDate" TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS "Items" (
            "orderId" VARCHAR(50) REFERENCES "Order"("orderId") ON DELETE CASCADE,
            "productId" INTEGER NOT NULL,
            "quantity" INTEGER NOT NULL,
            "price" NUMERIC NOT NULL
        );
    `;
    // Logs de sucesso/erro
    try {
        await dbPool.query(tableQuery);
        console.log("Banco de dados e tabelas checadas/criadas com sucesso.");
    } catch (erro) {
        console.error("Erro ao criar as tabelas:", erro);
    }
};

module.exports = { dbPool, setupDatabase };