// Arquivo de entrada principal da aplicação

// Instanciamento 
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
const { httpLogger, logger } = require('./middleware/logger');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Order Flow API',
            version: '1.0.0',
            description: 'API para gerenciamento de pedidos',
        },
    },
    apis: ['./src/app.js', './src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(httpLogger);
app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        logger.error(`JSON malformado recebido: ${err.message}`);
        return res.status(400).json({ error: 'JSON malformado no corpo da requisição.' });
    }
    next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Gera um token JWT válido por 30 minutos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    logger.debug(`Tentativa de login para usuário: ${username}`);

    if (username === 'admin' && password === 'admin') {
        const secret = process.env.JWT_SECRET || 'minha_chave_secreta_super_segura_123';
        const token = jwt.sign({ username }, secret, { expiresIn: '30m' });
        logger.info(`Login realizado com sucesso para usuário: ${username}`);
        return res.json({ token });
    }

    logger.error(`Falha na autenticação para usuário: ${username}`);
    res.status(401).json({ error: 'Credenciais inválidas' });
});

// Pluga as rotas
app.use('/order', orderRoutes);

module.exports = app; // Exporta o app configurado