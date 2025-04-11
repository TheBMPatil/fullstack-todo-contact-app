import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      navigate('/contacts');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Add New Contact
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={2}
            margin="normal"
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Add Contact
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/contacts')}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddContact; 