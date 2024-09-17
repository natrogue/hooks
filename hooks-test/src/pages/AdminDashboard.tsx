import React from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleDonacionesEspecie = () => {
        navigate('/donaciones-especie');
    };

    const handleDonacionesLinea = () => {
        navigate('/donaciones-linea');
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Donaciones en especie
                        </Typography>
                        <Button variant="contained" 
                                color="primary"
                                onClick={handleDonacionesEspecie}>
                            Ver donaciones
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Donaciones en línea
                        </Typography>
                        <Button variant="contained" 
                                color="primary"
                                onClick={handleDonacionesLinea}>
                            Ver donaciones
                        </Button>
                    </Paper>
             </Grid>
        </Grid>
    </Box>
    );
};

export default AdminDashboard;