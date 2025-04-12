import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Get the base URL from environment or current location
const BASE_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:5000';

const API_URL = `${BASE_URL}/api`;

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    notes: '',
    imageUrl: '',
    priority: 'medium',
    status: 'pending',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/todos/${id}`);
        if (response.data) {
          setTodo(response.data);
          setFormData({
            title: response.data.title,
            description: response.data.description || '',
            dueDate: response.data.dueDate ? new Date(response.data.dueDate).toISOString().split('T')[0] : '',
            notes: response.data.notes || '',
            imageUrl: response.data.imageUrl || '',
            priority: response.data.priority || 'medium',
            status: response.data.status || 'pending',
          });
        } else {
          setError('Todo not found');
        }
      } catch (err) {
        console.error('Error fetching todo:', err);
        setError(err.response?.data?.message || 'Failed to load todo. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

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
      await axios.patch(`${API_URL}/todos/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Edit Todo
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="postponed">Postponed</MenuItem>
            </Select>
          </FormControl>
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
              Update Todo
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

export default EditTodo; 