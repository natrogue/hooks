import * as React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; 
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';  
import UserDashboard from './pages/UserDashboard';    
import { Route } from 'react-router-dom';             
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
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}  // Usar Dashboard para manejar la redirección
      loginPage={LoginPage}  // Página de login
    >
      <CustomRoutes>
        {/* Ruta de la página de introducción, siempre accesible */}
        <Route path="/" element={<IntroPage />} />  

        {/* Ruta para el login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas personalizadas para admin y user */}
        {role === 'admin' && (
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  
        )}
        {role === 'user' && (
          <Route path="/user-dashboard" element={<UserDashboard />} />    
        )}
      </CustomRoutes>

      {/* Recursos del CRM solo para admin */}
      {role === 'admin' && (
        <>
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
        </>
      )}
      
      {/* Recursos o componentes adicionales solo para usuarios regulares */}
      {role === 'user' && (
        <>
          {/* Aquí puedes agregar recursos o componentes que sólo quieras que vean los usuarios */}
        </>
      )}
    </Admin>
  );
};

export default App;