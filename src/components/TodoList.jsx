import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
} from '@mui/material';
import { format } from 'date-fns';
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

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}`, {
        status: newStatus,
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    
    try {
      await axios.delete(`${API_URL}/todos/${todoToDelete._id}`);
      fetchTodos();
      setDeleteDialogOpen(false);
      setTodoToDelete(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again later.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'postponed':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusButtons = (todo) => {
    const statuses = ['pending', 'completed', 'postponed'];
    return (
      <ButtonGroup 
        variant="outlined" 
        size="small"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiButton-root': {
            flex: '1 1 auto',
            minWidth: '80px',
            whiteSpace: 'nowrap',
            '@media (max-width: 600px)': {
              fontSize: '0.75rem',
              padding: '4px 8px',
            }
          }
        }}
      >
        {statuses.map((status) => (
          <Button
            key={status}
            variant={todo.status === status ? 'contained' : 'outlined'}
            color={getStatusColor(status)}
            onClick={() => handleStatusChange(todo._id, status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Todos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/add-todo"
        >
          Add Todo
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo._id}>
            <Card sx={{ 
              backgroundColor: todo.status === 'completed' ? '#e8f5e9' : 
                            todo.status === 'postponed' ? '#fff3e0' : 
                            '#ffffff'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" component="h2">
                    {todo.title}
                  </Typography>
                  <Box>
                    <IconButton 
                      size="small" 
                      color="primary"
                      component={RouterLink}
                      to={`/edit-todo/${todo._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteClick(todo)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
                </Typography>
                <Chip
                  label={todo.priority}
                  color={getPriorityColor(todo.priority)}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" paragraph>
                  {todo.description}
                </Typography>
                {todo.notes && (
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Notes: {todo.notes}
                  </Typography>
                )}
                {todo.imageUrl && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={todo.imageUrl}
                      alt="Todo"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  {getStatusButtons(todo)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Todo</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{todoToDelete?.title}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TodoList; 