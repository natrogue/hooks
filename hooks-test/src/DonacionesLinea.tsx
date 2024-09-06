import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, TextInput, SimpleForm, NumberInput, required } from 'react-admin';

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
                    <TextField source="ID" />
                    <TextField source="Donor Name" />
                    <TextField source="Amount" />
                    <TextField source="Date" />
                    <TextField source="Section" />
                    

                </Datagrid>
            )}
        </List>
    );
};

export const DonacionesLineaCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="Donor Name" validate={[required()]} />
            <NumberInput source="Amount" validate={[required()]} />
            <TextInput source="Date" />
        </SimpleForm>
    </Create>
);
