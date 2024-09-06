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
      name="Donaciones en Linea"
      list={DonacionesLineaList}
      create={DonacionesLineaCreate}
    />
    <Resource
      name="Donaciones en Especie"
      list={DonacionesEspecieList}
      create={DonacionesEspecieCreate}
    />
  </Admin>
);
