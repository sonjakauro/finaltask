import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { CustomerForm, Customer } from '../types';

type EditCustomerProps = {
    getCustomers: () => void;
    CustomerRow: Customer;
}

export default function EditCustomer({ getCustomers, CustomerRow }: EditCustomerProps) {
    const [open, setOpen] = useState(false);

    const [Customer, setCustomer] = useState<CustomerForm>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    })

    const handleClickOpen = () => {
        setCustomer({
            firstname: CustomerRow.firstname,
            lastname: CustomerRow.lastname,
            streetaddress: CustomerRow.streetaddress,
            postcode: CustomerRow.postcode,
            city: CustomerRow.city,
            email: CustomerRow.email,
            phone: CustomerRow.phone,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        fetch(CustomerRow._links.self.href, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(Customer),
        }) //siirretään API-välilehdelle
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when editing Customer")
                return response.json();
            })
            .then(() => {
                getCustomers();
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                EDIT
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer details</DialogTitle>
                <DialogContent>
                    <TextField
                        value={Customer.firstname}
                        onChange={event => setCustomer({ ...Customer, firstname: event.target.value })}
                        margin="dense"
                        label="First name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Customer.lastname}
                        onChange={event => setCustomer({ ...Customer, lastname: event.target.value })}
                        margin="dense"
                        label="Last name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Customer.streetaddress}
                        onChange={event => setCustomer({ ...Customer, streetaddress: event.target.value })}
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Customer.postcode}
                        onChange={event => setCustomer({ ...Customer, postcode: event.target.value })}
                        margin="dense"
                        label="Post code"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Customer.city}
                        onChange={event => setCustomer({ ...Customer, city: event.target.value })}
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Customer.email}
                        onChange={event => setCustomer({ ...Customer, email: event.target.value })}
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Customer.phone}
                        onChange={event => setCustomer({ ...Customer, phone: event.target.value })}
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
