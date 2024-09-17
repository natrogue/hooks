import React from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import { List, Datagrid, TextField, SimpleList, Create, 
    TextInput, SimpleForm, SelectInput, required } from 'react-admin';
import IfCanAccess from 'react-admin';

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
                    <TextField source="id" label="ID" />
                    <TextField source="donorName" label="Nombre de Donante" />
                    <TextField source="item" label="Artículo Donado" />
                    <TextField source="donationType" label="Tipo de Donación" />
                    <TextField source="comment" label="Comentario" />
                </Datagrid>
            )}
        </List>
    );
};

export const DonacionesEspecieCreate = () => (
    <Create>
        <SimpleForm>
        <TextInput source="donorName" label="Nombre del Donante" validate={[required()]} />
            <TextInput source="item" label="Artículo Donado" validate={[required()]} />
            <SelectInput source="donationType" label="Tipo de Donación" choices={donationTypes} />
            <TextInput source="comment" label="Comentario" />
        </SimpleForm>
    </Create>
);

