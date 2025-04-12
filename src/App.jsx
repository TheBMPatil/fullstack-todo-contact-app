import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import ContactList from './components/ContactList';
import AddTodo from './components/AddTodo';
import AddContact from './components/AddContact';
import EditTodo from './components/EditTodo';
import EditContact from './components/EditContact';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-todo/:id" element={<EditTodo />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 