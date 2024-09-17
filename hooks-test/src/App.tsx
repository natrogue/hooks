import * as React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin'; 
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';  
import UserDashboard from './pages/UserDashboard';    
import { Route } from 'react-router-dom';             
import { DonacionesLineaList, DonacionesLineaCreate } from './DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate } from './DonacionesEspecie';

const App = () => {
  const role = localStorage.getItem('role');  // Obtener el rol del usuario

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
            create={DonacionesLineaCreate}
          />
          <Resource 
            name="donaciones-especie"
            list={DonacionesEspecieList}
            create={DonacionesEspecieCreate}
          />
        </>
      )}
    </Admin>
  );
};

export default App;