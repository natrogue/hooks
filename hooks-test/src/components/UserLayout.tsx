// UserLayout.tsx
import { Layout as RaLayout, AppBar as RaAppBar } from 'react-admin';  // Usamos el AppBar y Layout predeterminados de react-admin

const UserLayout = (props: any) => (
    <RaLayout
        {...props}
        appBar={RaAppBar}  // Usamos el AppBar predeterminado
        menu={null}  // Esto oculta el menú lateral para los usuarios
    />
);

export default UserLayout;