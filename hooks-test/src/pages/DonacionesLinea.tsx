import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, TextInput, SimpleForm, 
    NumberInput, NumberField, required, Edit, DateField, DateInput } from 'react-admin';

// Componente para listar donaciones en línea
export const DonacionesLineaList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.donorName}
                    secondaryText={record => `$${record.amount}`}
                    tertiaryText={record => new Date(record.date).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" label="ID" />  {/* Mapea el id desde _id */}
                    <TextField source="donorName" label="Nombre" />  {/* Nombre correcto del campo */}
                    <NumberField source="amount" label="Cantidad" />  {/* Nombre correcto del campo */}
                    <DateField source="date" label="Fecha" />  {/* Nombre correcto del campo */}
                    <TextField source="section" label="Sección" />  {/* Nombre correcto del campo */}
                </Datagrid>
            )}
        </List>
    );
};

// Componente para crear una donación en línea
export const DonacionesLineaCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="donorName" label="Nombre" validate={[required()]} />  {/* Nombre correcto del campo */}
            <NumberInput source="amount" label="Cantidad" validate={[required()]} />  {/* Nombre correcto del campo */}
            <DateInput source="date" label="Fecha" />  {/* Nombre correcto del campo */}
            <TextInput source="section" label="Sección" />  {/* Añadido el campo 'Section' */}
        </SimpleForm>
    </Create>
);

// Componente para editar una donación en línea
export const DonacionesLineaEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="donorName" label="Nombre" validate={[required()]} />  {/* Nombre correcto del campo */}
            <NumberInput source="amount" label="Cantidad" validate={[required()]} />  {/* Nombre correcto del campo */}
            <DateInput source="date" label="Fecha" />  {/* Nombre correcto del campo */}
            <TextInput source="section" label="Sección" />  {/* Añadido el campo 'Section' */}
        </SimpleForm>
    </Edit>
);