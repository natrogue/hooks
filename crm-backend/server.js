const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// Rutas para Donaciones en Línea
app.get('/donaciones-linea', async (req, res) => {
    try {
        const donaciones = await DonacionLinea.find();
        res.json(donaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/donaciones-linea', async (req, res) => {
    try {
        const nuevaDonacion = new DonacionLinea(req.body);
        await nuevaDonacion.save();
        res.status(201).json(nuevaDonacion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Rutas para Donaciones en Especie
app.get('/donaciones-especie', async (req, res) => {
    try {
        const donaciones = await DonacionEspecie.find();
        res.json(donaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/donaciones-especie', async (req, res) => {
    try {
        const nuevaDonacion = new DonacionEspecie(req.body);
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