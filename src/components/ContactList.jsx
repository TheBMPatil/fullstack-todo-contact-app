import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// Get the base URL from environment or current location
const BASE_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:5000';

const API_URL = `${BASE_URL}/api`;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contacts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;
    
    try {
      await axios.delete(`${API_URL}/contacts/${contactToDelete._id}`);
      fetchContacts();
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Failed to delete contact. Please try again later.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setContactToDelete(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Contacts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/add-contact"
        >
          Add Contact
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading contacts...</Typography>
      ) : (
        <Grid container spacing={3}>
          {contacts.map((contact) => (
            <Grid item xs={12} sm={6} md={4} key={contact._id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {contact.imageUrl ? (
                      <Avatar
                        src={contact.imageUrl}
                        alt={contact.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                        {contact.name.charAt(0)}
                      </Avatar>
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2">
                        {contact.name}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component={RouterLink}
                        to={`/edit-contact/${contact._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => handleDeleteClick(contact)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {contact.email && (
                    <Typography color="textSecondary" gutterBottom>
                      Email: {contact.email}
                    </Typography>
                  )}
                  {contact.phone && (
                    <Typography color="textSecondary" gutterBottom>
                      Phone: {contact.phone}
                    </Typography>
                  )}
                  {contact.notes && (
                    <Typography variant="body2" paragraph>
                      Notes: {contact.notes}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {contactToDelete?.name}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactList; 