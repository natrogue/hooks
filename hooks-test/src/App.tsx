import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { DonacionesLineaList, DonacionesLineaCreate } from './DonacionesLinea';
import { DonacionesEspecieList, DonacionesEspecieCreate } from './DonacionesEspecie';

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="DonacionesLinea"
      list={DonacionesLineaList}
      create={DonacionesLineaCreate}
    />
    <Resource
      name="DonacionesEspecie"
      list={DonacionesEspecieList}
      create={DonacionesEspecieCreate}
    />
  </Admin>
);
