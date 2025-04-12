import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Get the base URL from environment or current location
const BASE_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:5000';

const API_URL = `${BASE_URL}/api`;

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/contacts/${id}`);
        if (response.data) {
          setContact(response.data);
          setFormData({
            name: response.data.name,
            email: response.data.email || '',
            phone: response.data.phone || '',
            notes: response.data.notes || ''
          });
        } else {
          setError('Contact not found');
        }
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError(err.response?.data?.message || 'Failed to load contact. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
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
      await axios.patch(`${API_URL}/contacts/${id}`, formData);
      navigate('/contacts');
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact. Please try again later.');
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
          Edit Contact
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={formData.imageUrl}
              sx={{ width: 100, height: 100, mb: 2 }}
            >
              {formData.name.charAt(0)}
            </Avatar>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
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
              Update Contact
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

export default EditContact; 