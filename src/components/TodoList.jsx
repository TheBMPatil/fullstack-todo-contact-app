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
} from '@mui/material';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
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

      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {todo.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
                </Typography>
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
                  <Chip
                    label={todo.status}
                    color={getStatusColor(todo.status)}
                    sx={{ mr: 1 }}
                  />
                  <Button
                    size="small"
                    onClick={() =>
                      handleStatusChange(
                        todo._id,
                        todo.status === 'pending'
                          ? 'completed'
                          : todo.status === 'completed'
                          ? 'postponed'
                          : 'pending'
                      )
                    }
                  >
                    Change Status
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

export default TodoList; 