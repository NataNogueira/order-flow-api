const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    // Log
    if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

    try {
        // Se a chave token estiver configurada dentro do seu .env irá seguir
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        // Log
        res.status(400).json({ error: 'Token inválido.' });
    }
};

module.exports = auth;