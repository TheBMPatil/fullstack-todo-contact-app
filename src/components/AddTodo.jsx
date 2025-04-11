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

const AddTodo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    notes: '',
    imageUrl: '',
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
      await axios.post('http://localhost:5000/api/todos', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Add New Todo
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
          <TextField
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Add Todo
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
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

export default AddTodo; 