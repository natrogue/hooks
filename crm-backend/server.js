const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const verifyRole = require('./middlewares/verifyRole');

const User = require('./models/userModel');

const JWT_SECRET = 'mysecretkey';


const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/crmDummy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos MongoDB');
}).catch((err) => {
    console.error('Error al conectar a MongoDB', err);
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Email o contraseña incorrectos' });
        }

        // Compare the password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ error: 'Email o contraseña incorrectos' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send token and role to the client
        res.json({ token, role: user.role });  // Aquí agregamos el rol del usuario a la respuesta
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Protected route with middleware
app.get('/protected-data', authenticateToken, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
});

// JWT auth middleware
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

// Definir el esquema de Mongoose para Donaciones en Línea
const donacionLineaSchema = new mongoose.Schema({
    donorName: String,
    amount: Number,
    date: String,
    section: String,
});

// Crear el modelo de Mongoose a partir del esquema de Donaciones en Línea
const DonacionLinea = mongoose.model('DonacionLinea', donacionLineaSchema);

// Definir el esquema de Mongoose para Donaciones en Especie
const donacionEspecieSchema = new mongoose.Schema({
    donorName: String,
    item: String,
    donationType: String,
    comment: String,
},
    { collection: 'donacionesespecie' }
);

// Crear el modelo de Mongoose a partir del esquema de Donaciones en Especie
const DonacionEspecie = mongoose.model('DonacionEspecie', donacionEspecieSchema);

// Rutas para Donaciones en Línea (solo admin)
app.get('/donaciones-linea', async (req, res) => {
    try {
        const donaciones = await DonacionLinea.find();
        res.json({
            data: donaciones.map(donacion => ({ ...donacion.toObject(), id: donacion._id })),  // Mapea _id a id
            total: donaciones.length  // Añadir total para la paginación
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/donaciones-linea', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const nuevaDonacion = new DonacionLinea(req.body);
        await nuevaDonacion.save();
        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Rutas para Donaciones en Especie (solo admin)
app.get('/donaciones-especie', async (req, res) => {
    try {
        const donaciones = await DonacionEspecie.find();
        res.json({
            data: donaciones.map(donacion => ({ ...donacion.toObject(), id: donacion._id })),  // Mapea _id a id
            total: donaciones.length  // Añadir total para la paginación
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/donaciones-especie', authenticateToken, verifyRole('admin'), async (req, res) => {
    try {
        const nuevaDonacion = new DonacionEspecie(req.body);
        await nuevaDonacion.save();
        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ruta para ver las donaciones del usuario (solo user)
app.get('/user-donations', authenticateToken, verifyRole('user'), async (req, res) => {
    try {
        const donaciones = await DonacionLinea.find({ donorName: req.user.email }); // Mostrar solo las donaciones del usuario
        res.json(donaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para crear donaciones (solo user)
app.post('/user-donations', authenticateToken, verifyRole('user'), async (req, res) => {
    try {
        const nuevaDonacion = new DonacionLinea({
            donorName: req.user.email, // Obtener el nombre del usuario logueado
            amount: req.body.amount,
            date: new Date().toISOString(),
            section: req.body.section
        });
        await nuevaDonacion.save();
        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});