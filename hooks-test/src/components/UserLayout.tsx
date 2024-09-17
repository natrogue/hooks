import * as React from 'react';
import { Layout as RaLayout } from 'react-admin';  // Usa el Layout base de react-admin

const UserLayout = (props: any) => {
  // Personaliza el Layout para usuarios, sin la barra lateral, por ejemplo.
  return <RaLayout {...props} menu={null} />; // Ocultamos el menú en el layout del usuario
};

export default UserLayout;