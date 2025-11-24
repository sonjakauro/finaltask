import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { AddTrainingForm, Customer } from '../types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type AddTrainingProps = {
    CustomerRow: Customer;
}

export default function AddTraining({ CustomerRow }: AddTrainingProps) {
    const [open, setOpen] = useState(false);

    const [Training, setTraining] = useState<AddTrainingForm>({
        date: null,
        duration: 0,
        activity: "",
        customer: CustomerRow._links.self.href

    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(Training),
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding training")
                return response.json();
            })
            .then(() => {
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (
        <>
        <Button size="small" color="success" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new training to a customer</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        value={Training.date}
                        onChange={value => setTraining({ ...Training, date: value })}
                        label="Date and time"
                    />
                    </LocalizationProvider>
                    <TextField
                        value={Training.duration}
                        onChange={event => setTraining({ ...Training, duration: Number(event.target.value) })}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        value={Training.activity}
                        onChange={event => setTraining({ ...Training, activity: event.target.value })}
                        margin="dense"
                        label="Activity"
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
