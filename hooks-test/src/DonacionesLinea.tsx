import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, TextInput, SimpleForm, NumberInput, required } from 'react-admin';

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
                    <TextField source="donorName" label="Donor Name" />  {/* Nombre correcto del campo */}
                    <TextField source="amount" label="Amount" />  {/* Nombre correcto del campo */}
                    <TextField source="date" label="Date" />  {/* Nombre correcto del campo */}
                    <TextField source="section" label="Section" />  {/* Nombre correcto del campo */}
                </Datagrid>
            )}
        </List>
    );
};

// Componente para crear una donación en línea
export const DonacionesLineaCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="donorName" label="Donor Name" validate={[required()]} />  {/* Nombre correcto del campo */}
            <NumberInput source="amount" label="Amount" validate={[required()]} />  {/* Nombre correcto del campo */}
            <TextInput source="date" label="Date" />  {/* Nombre correcto del campo */}
            <TextInput source="section" label="Section" />  {/* Añadido el campo 'Section' */}
        </SimpleForm>
    </Create>
);