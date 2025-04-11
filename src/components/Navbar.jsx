import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactsIcon from '@mui/icons-material/Contacts';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ChecklistIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<ChecklistIcon />}
          >
            Todos
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/contacts"
            startIcon={<ContactsIcon />}
          >
            Contacts
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 