import { Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom'; // Usar Link para navegar entre las rutas

const AdminDashboard = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Donaciones en especie
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link} // Usar Link para la navegación
            to="/donaciones-especie" // La ruta correcta para donaciones en especie
            variant="contained"
            color="primary"
          >
            Ver Donaciones
          </Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Donaciones en línea
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link} // Usar Link para la navegación
            to="/donaciones-linea" // La ruta correcta para donaciones en línea
            variant="contained"
            color="primary"
          >
            Ver Donaciones
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

export default AdminDashboard;