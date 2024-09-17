import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useNotify, useDataProvider } from 'react-admin'; // Hooks de react-admin para notificaciones y crear en la base de datos

const UserDashboard = () => {
    const [donorName, setDonorName] = useState(''); // Estado para el nombre del donante
    const [amount, setAmount] = useState(''); // Estado para la cantidad
    const [loading, setLoading] = useState(false); // Estado para deshabilitar botón mientras se envía el formulario
    const notify = useNotify();
    const dataProvider = useDataProvider(); // Para acceder al dataProvider y realizar la operación create

    const handleSubmit = async () => {
        if (!donorName || !amount) {
            notify('Por favor, ingrese todos los campos', { type: 'warning' });
            return;
        }

        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            notify('Ingrese una cantidad válida mayor que 0', { type: 'warning' });
            return;
        }

        try {
            setLoading(true); // Deshabilitar el botón mientras se realiza la operación

            // Crear una nueva donación en la base de datos usando el recurso 'donaciones-linea'
            await dataProvider.create('donaciones-linea', {
                data: { donorName, amount: Number(amount), date: new Date().toISOString().split('T')[0], section: 'A' } 
            });

            notify('Donación creada exitosamente', { type: 'success' });

            // Limpiar los campos del formulario
            setDonorName('');
            setAmount('');
        } catch (error) {
            notify('Error al crear la donación', { type: 'error' });
        } finally {
            setLoading(false); // Habilitar el botón después de la operación
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ padding: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Fundación Sanders - Agua para todos
                </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        margin="normal"
                        disabled={loading} // Deshabilitar mientras se envía el formulario
                    />
                    <TextField
                        fullWidth
                        label="Cantidad a Donar"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        margin="normal"
                        type="number"
                        disabled={loading} // Deshabilitar mientras se envía el formulario
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                        disabled={loading} // Deshabilitar el botón mientras se procesa la donación
                    >
                        {loading ? 'Procesando...' : 'Donar'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserDashboard;