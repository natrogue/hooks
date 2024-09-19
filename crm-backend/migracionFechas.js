const mongoose = require('mongoose');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/crmDummy', {
}).then(() => {
    console.log('Conectado a la base de datos MongoDB');
    actualizarFechas();  // Llamar a la función de migración
}).catch((err) => {
    console.error('Error al conectar a MongoDB', err);
});

// Definir el esquema de Mongoose para Donaciones en Línea
const donacionLineaSchema = new mongoose.Schema({
    donorName: String,
    amount: Number,
    date: String,  // Temporalmente seguimos usando String para las donaciones viejas
    section: String,
});

const DonacionLinea = mongoose.model('DonacionLinea', donacionLineaSchema);

// Función para actualizar las fechas de todas las donaciones
const actualizarFechas = async () => {
    const donaciones = await DonacionLinea.find({});  // Buscar todas las donaciones
    donaciones.forEach(async (donacion) => {
        if (typeof donacion.date === 'string') {
            donacion.date = new Date(donacion.date);  // Convertir string a Date
            await donacion.save();  // Guardar la actualización en la base de datos
        }
    });

    console.log('Fechas actualizadas correctamente');
    process.exit();  // Terminar el script una vez que termine
};