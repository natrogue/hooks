import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { TextField, Button, Container, Typography, Box, Paper, Grid, Avatar, 
    CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Intentar iniciar sesión
            await login({ email, password });
    
            // Verifica si localStorage tiene 'auth' y si el rol es válido
            const auth = localStorage.getItem('auth');
            if (!auth) {
                throw new Error("No se encontró la información de autenticación");
            }
    
            const parsedAuth = JSON.parse(auth);
            const userRole = parsedAuth.role;
    
            // Redirigir según el rol del usuario
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else if (userRole === 'user') {
                navigate('/user-dashboard');
            } else {
                throw new Error("Rol desconocido");
            }
    
            setLoading(false);
        } catch (error) {
            // Solo si ocurre un error real, mostrar notificación
            if (error instanceof Error) {
                notify(error.message || 'Email o password incorrecto');
            } else {
                notify('Email o password incorrecto');
            }
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
                <Grid container direction="column" alignItems="center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Fundación Sanders
                    </Typography>
                    <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {loading ? 'Entrando...' : 'Iniciar Sesión'}
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginPage;