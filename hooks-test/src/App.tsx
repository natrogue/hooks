import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import LoginPage from "./LoginPage";
import { DonacionesLineaList, DonacionesLineaCreate } from './DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate } from './DonacionesEspecie';

export const App = () => (
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
  </Admin>
);
