import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { TrainingForm } from '../types';

type AddTrainingProps = {
    getTrainings: () => void;
}

export default function AddTraining({ getTrainings }: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const [Training, setTraining] = useState<TrainingForm>({
    date: "",
    duration: 0,
    activity: "",
    customer: "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/{id}"
    
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
        headers: { "content-type" : "application/json" },
        body: JSON.stringify(Training),
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding training")
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new training to a customer</DialogTitle>
        <DialogContent>
            <TextField
            value={Training.date}
            onChange={event => setTraining({ ...Training, date: event.target.value})}
              margin="dense"
              label="Date"
              fullWidth
              variant="standard"
            />
                       <TextField
            value={Training.duration}
            onChange={event => setTraining({ ...Training, duration: Number(event.target.value)})}
              margin="dense"
              label="Last name"
              fullWidth
              variant="standard"
            />
                       <TextField
            value={Training.activity}
            onChange={event => setTraining({ ...Training, activity: event.target.value})}
              margin="dense"
              label="Street address"
              fullWidth
              variant="standard"
            />
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick = {handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
