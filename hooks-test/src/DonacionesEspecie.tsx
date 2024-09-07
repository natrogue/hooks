import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, TextInput, SimpleForm, SelectInput, required } from 'react-admin';

const donationTypes = [
    { id: 'campaña', name: 'Campaña' },
    { id: 'patrocina', name: 'Patrocina' }
];

export const DonacionesEspecieList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.donorName}
                    secondaryText={record => record.item}
                    tertiaryText={record => record.donationType}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" label="ID" />  {/* Mapea el id */}
                    <TextField source="donorName" label="Donor Name" />  {/* Nombre correcto del campo */}
                    <TextField source="item" label="Item" />  {/* Nombre correcto del campo */}
                    <TextField source="donationType" label="Donation Type" />  {/* Nombre correcto del campo */}
                    <TextField source="comment" label="Comment" />  {/* Nombre correcto del campo */}
                </Datagrid>
            )}
        </List>
    );
};

export const DonacionesEspecieCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="donorName" label="Donor Name" validate={[required()]} />  {/* Nombre correcto del campo */}
            <TextInput source="item" label="Item" validate={[required()]} />  {/* Nombre correcto del campo */}
            <SelectInput source="donationType" label="Donation Type" choices={donationTypes} />  {/* Nombre correcto del campo */}
            <TextInput source="comment" label="Comment" />  {/* Nombre correcto del campo */}
        </SimpleForm>
    </Create>
);

