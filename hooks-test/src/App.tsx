import * as React from 'react';
import { Admin, Resource, CustomRoutes, Layout as RaLayout } from 'react-admin';  
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { Route } from 'react-router-dom';         
import { DonacionesLineaList, DonacionesLineaCreate } from './DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate } from './DonacionesEspecie';
import UserLayout from './components/UserLayout';  // Importar UserLayout para el rol de usuario

const App = () => {
  // Obtén el rol del usuario almacenado
  const role = localStorage.getItem('role') || 'user';  // 'user' como valor predeterminado

  return (
      <Admin
          authProvider={authProvider}
          dataProvider={dataProvider}
          dashboard={Dashboard}  
          loginPage={LoginPage}
          layout={role === 'admin' ? RaLayout : UserLayout} // Layout de admin o user
      >
          {/* Rutas personalizadas */}
          <CustomRoutes>
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