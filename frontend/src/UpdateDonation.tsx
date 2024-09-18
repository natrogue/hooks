import React, { useState } from 'react';
import { useUpdate, useNotify } from 'react-admin';
import { Button, TextField } from '@mui/material';

const UpdateDonation = () => {
    const [update, { isLoading, error }] = useUpdate();  // Destructure the useUpdate hook
    const [donorName, setDonorName] = useState('');  // State for the donor name
    const [amount, setAmount] = useState(0);  // State for the amount
    const [id, setId] = useState('');  // State for the ID of the record to update
    const notify = useNotify();

    const handleUpdate = () => {
        update(
            'donaciones-linea',   // The name of the resource (collection name in the backend)
            { id, data: { donorName, amount } }  // The ID and the data to update
        )
        .then(() => {
            notify('Update successful', { type: 'success' });
        })
        .catch(() => {
            notify('Error during update', { type: 'warning' });
        });
    };

    return (
        <div>
            <h2>Update Donation</h2>
            <TextField
                label="Donor ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                fullWidth
            />
            <TextField
                label="Donor Name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                fullWidth
            />
            <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                fullWidth
            />
            <Button
                onClick={handleUpdate}
                disabled={isLoading}
                variant="contained"
                color="primary"
            >
                {isLoading ? 'Updating...' : 'Update Donation'}
            </Button>
            {error && <p style={{ color: 'red' }}>Error updating the record</p>}
        </div>
    );
};

export default UpdateDonation;