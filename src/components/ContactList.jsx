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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${contactToDelete._id}`);
      fetchContacts();
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
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
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => handleDeleteClick(contact)}
                  >
                    <DeleteIcon />
                  </IconButton>
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {contactToDelete?.name}?
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