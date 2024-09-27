import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const IntroPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenidos a la Fundación
      </Typography>
      <Typography variant="body1" paragraph>
        Estamos comprometidos con nuestra comunidad. Conoce más sobre lo que hacemos.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
        Ir a Login
      </Button>
    </Box>
  );
};

export default IntroPage;