import * as React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; 
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';  
import UserDashboard from './pages/UserDashboard';    
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';             
import { DonacionesLineaList, DonacionesLineaEdit } from './pages/DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate, DonacionesEspecieEdit } from './pages/DonacionesEspecie';
import EstadisticasDonaciones from './pages/EstadisticasDonaciones';
import IntroPage from './pages/IntroPage';  // Importa la nueva página de introducción

const App = () => {
  const [role, setRole] = React.useState<string | null>(null);

  // UseEffect para obtener el rol desde localStorage cuando el componente se monta
  React.useEffect(() => {
    const storedRole = localStorage.getItem('role');  // Obtener el rol del usuario
    setRole(storedRole);  // Establecer el rol en el estado
  }, []);  // Se ejecuta una vez cuando el componente se monta

  // Mostrar un mensaje de carga mientras el rol se está obteniendo
  if (!role) {
    return <div>Loading...</div>;  
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de la página de introducción */}
        <Route path="/" element={<IntroPage />} />  

        {/* Ruta de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta condicional para el Admin solo si el usuario está autenticado */}
        <Route 
          path="/admin/*" 
          element={
            role === 'admin' ? (
              <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                dashboard={Dashboard}
              >
                <CustomRoutes>
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />  
                </CustomRoutes>

                <Resource 
                  name="donaciones-linea"
                  list={DonacionesLineaList}
                  edit={DonacionesLineaEdit}
                />
                <Resource 
                  name="donaciones-especie"
                  list={DonacionesEspecieList}
                  create={DonacionesEspecieCreate}
                  edit={DonacionesEspecieEdit}
                />
                <Resource 
                  name="estadisticas-donaciones"
                  list={EstadisticasDonaciones}
                />
              </Admin>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Ruta condicional para el usuario común */}
        <Route 
          path="/user/*" 
          element={
            role === 'user' ? (
              <Admin
                authProvider={authProvider}
                dataProvider={dataProvider}
                dashboard={UserDashboard} // Para redirigir al user dashboard
              >
                <CustomRoutes>
                  <Route path="/user-dashboard" element={<UserDashboard />} />    
                </CustomRoutes>
              </Admin>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;