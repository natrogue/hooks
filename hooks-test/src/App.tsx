import * as React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; 
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';  
import UserDashboard from './pages/UserDashboard';    
import { Route } from 'react-router-dom';             
import { DonacionesLineaList, DonacionesLineaCreate, DonacionesLineaEdit } from './pages/DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate,
  DonacionesEspecieEdit } from './pages/DonacionesEspecie';

const App = () => {
  const [role, setRole] = React.useState<string | null>(null);
  //const role = localStorage.getItem('role');  // Obtener el rol del usuario

  // UseEffect para obtener el rol desde localStorage cuando el componente se monta
  React.useEffect(() => {
    const storedRole = localStorage.getItem('role');  // Obtener el rol del usuario
    setRole(storedRole);  // Establecer el rol en el estado
  }, []);  // Se ejecuta una vez cuando el componente se monta

  if (!role) {
    return <div>Loading...</div>;  // Mientras se carga el rol, mostrar un mensaje de carga
  }

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}  // Usar Dashboard para manejar la redirección
      loginPage={LoginPage}  // Página de login
    >
      <CustomRoutes>
        {/* Rutas personalizadas para admin y user */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />  
        <Route path="/user-dashboard" element={<UserDashboard />} />    
      </CustomRoutes>

      {/* Recursos del CRM solo para admin */}
      {role === 'admin' && (
        <>
          <Resource 
            name="donaciones-linea"
            list={DonacionesLineaList}
            //create={DonacionesLineaCreate}
            edit={DonacionesLineaEdit}
          />
          <Resource 
            name="donaciones-especie"
            list={DonacionesEspecieList}
            create={DonacionesEspecieCreate}
            edit={DonacionesEspecieEdit}
          />
        </>
      )}
      {role === 'user' && (
      <>
        {/* Aquí puedes agregar recursos o componentes que sólo quieras que vean los usuarios */}
        <Route path="/user-dashboard" element={<UserDashboard />} />    
      </>
    )}
    </Admin>
  );
};

export default App;