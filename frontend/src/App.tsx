
import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import LoginPage from "./LoginPage";
import UpdateDonation from "./UpdateDonation";
import { DonacionesLineaList, DonacionesLineaCreate } from './DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate } from './DonacionesEspecie';
import { i18nProvider } from "./i18nProvider"

export const App = () => (
  <div>
  <Admin 
    layout={Layout} 
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}>
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
    <UpdateDonation />
  </Admin>
  </div>
);
