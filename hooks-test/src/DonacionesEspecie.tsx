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
                    <TextField source="donorName" label="Donor Name" />
                    <TextField source="item" label="Item" />
                    <TextField source="donationType" label="Donation Type" />
                    <TextField source="comment" label="Comment" />
                </Datagrid>
            )}
        </List>
    );
};

export const DonacionesEspecieCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="donorName" label="Donor Name" validate={[required()]} />
            <TextInput source="item" label="Item" validate={[required()]} />
            <SelectInput source="donationType" label="Donation Type" choices={donationTypes} />
            <TextInput source="comment" label="Comment" />
        </SimpleForm>
    </Create>
);

