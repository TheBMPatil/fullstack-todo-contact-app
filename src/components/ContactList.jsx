import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
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
                <Typography variant="h6" component="h2">
                  {contact.name}
                </Typography>
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
                <Box sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContactList; 