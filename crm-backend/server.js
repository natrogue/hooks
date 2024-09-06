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

// Definir un esquema de ejemplo para las donaciones en línea
const donacionLineaSchema = new mongoose.Schema({
    donorName: String,
    amount: Number,
    date: String,
    section: String,
});

const DonacionLinea = mongoose.model('DonacionLinea', donacionLineaSchema);

// Definir las rutas para manejar las donaciones en línea
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});