const jwt = require('jsonwebtoken');

// Middleware para verificar el rol del usuario
const verifyRole = (requiredRole) => (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Obtener el token

    if (!token) return res.status(401).json({ error: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, 'your_jwt_secret_key');  // Verificar el token
        req.user = verified;

        // Verificar si el usuario tiene el rol necesario
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Acceso prohibido: rol insuficiente' });
        }

        next();  // Continuar si el rol es correcto
    } catch (err) {
        res.status(400).json({ error: 'Token inválido' });
    }
};

module.exports = verifyRole;