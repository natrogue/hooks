import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, TextInput, SimpleForm, ReferenceField, ReferenceInput, SelectInput, required, EmailField, Edit,CreateButton, EditButton } from 'react-admin';

export const EstadisticasList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.metric}
                    secondaryText={record => record.value}
                    tertiaryText={record => new Date(record.date).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="metric" />
                    <TextField source="value" />
                    <TextField source="date" />
                </Datagrid>
            )}
        </List>
    );
};

export const EstadisticasCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="metric" validate={[required()]} />
            <TextInput source="value" validate={[required()]} />
            <TextInput source="date" />
        </SimpleForm>
    </Create>
);
