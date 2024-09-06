import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, TextInput, SimpleForm, ReferenceField, ReferenceInput, SelectInput, required, EmailField, Edit,CreateButton, EditButton } from 'react-admin';

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
                    <TextField source="ID" />
                    <TextField source="Donor Name" />
                    <TextField source="Item" />
                    <TextField source="Donation Type" />
                    <TextField source="Comment" />
                </Datagrid>
            )}
        </List>
    );
};

export const DonacionesEspecieCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="Donor Name" validate={[required()]} />
            <TextInput source="Item" validate={[required()]} />
            <SelectInput source="Donation Type" choices={donationTypes} />
        </SimpleForm>
    </Create>
);
