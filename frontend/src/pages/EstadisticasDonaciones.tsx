import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Typography, Box, Paper, Grid } from '@mui/material';

const COLORS = ['#0088FE', '#FF8042'];

const EstadisticasDonaciones = () => {
    const dataProvider = useDataProvider();
    const [donacionesLinea, setDonacionesLinea] = useState<any[]>([]);
    const [donacionesEspecie, setDonacionesEspecie] = useState<any[]>([]);

    useEffect(() => {
        // Obtener las donaciones en línea
        dataProvider.getList('donaciones-linea', { pagination: { page: 1, perPage: 100 }, sort: { field: 'date', order: 'DESC' } })
            .then(({ data }) => setDonacionesLinea(data));

        // Obtener las donaciones en especie
        dataProvider.getList('donaciones-especie', { pagination: { page: 1, perPage: 100 }, sort: { field: 'date', order: 'DESC' } })
            .then(({ data }) => setDonacionesEspecie(data));
    }, [dataProvider]);

    // Datos para el gráfico de pastel
    const dataForPieChart = [
        { name: 'Donaciones en Línea', value: donacionesLinea.length },
        { name: 'Donaciones en Especie', value: donacionesEspecie.length }
    ];

    // Datos para el gráfico de barras
    const dataForBarChart = [
        { name: 'Línea', amount: donacionesLinea.reduce((total, item) => total + item.amount, 0) },
        { name: 'Especie', amount: donacionesEspecie.reduce((total, item) => total + item.amount, 0) }
    ];

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Estadísticas de Donaciones
            </Typography>

            {/* Pie Chart y Bar Chart juntos */}
            <Grid container spacing={3}>
                {/* Gráfico de pastel */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 3 }}>
                        <Typography variant="h6">Proporción de Donaciones</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={dataForPieChart}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {dataForPieChart.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Gráfico de barras */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 3 }}>
                        <Typography variant="h6">Total de Cantidades Donadas</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dataForBarChart}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EstadisticasDonaciones;