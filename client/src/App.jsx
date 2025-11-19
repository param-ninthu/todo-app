import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Box,
  Container,
  Typography,
  Chip,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useTodos } from './hooks/useTodos';
import Header from './components/layout/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Loader from './components/common/Loader';
import Popover from './components/common/Popover';
import Button from './components/common/Button';
import TodoFilter from './components/TodoFilter';

function App() {
  const {
    allTodos,
    loading,
    error,
    filter,
    setFilter,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    stats,
  } = useTodos();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreateTodo = async (data) => {
    await createTodo(data);
  };

  const activeTodos = allTodos.filter(todo => !todo.done);
  const completedTodos = allTodos.filter(todo => todo.done);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 2000,
          },
          error: {
            duration: 4000,
          },
        }}
      />

      <Header />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, pb: 3, borderBottom: '2px solid', borderColor: 'grey.200' }}>
            <Popover
              trigger={
                <Button startIcon={<AddIcon />} fullWidth>
                  Add Todo
                </Button>
              }
              title="Create New Todo"
              isOpen={isFormOpen}
              onOpenChange={setIsFormOpen}
            >
              {({ close }) => (
                <TodoForm onSubmit={handleCreateTodo} onClose={close} />
              )}
            </Popover>

            <Popover
              trigger={
                <Button variant="outlined" startIcon={<FilterListIcon />}>
                  Filter
                </Button>
              }
              title="Filter Todos"
              isOpen={isFilterOpen}
              onOpenChange={setIsFilterOpen}
            >
              <TodoFilter
                activeFilter={filter}
                onFilterChange={(newFilter) => {
                  setFilter(newFilter);
                  setIsFilterOpen(false);
                }}
                stats={stats}
              />
            </Popover>
          </Box>

          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              <strong>Error:</strong> {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader />
            </Box>
          ) : (
            <Box
              sx={{
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                pb: 6,
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.50',
                      borderRadius: 2,
                    }}
                  >
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: 16,
                        color: 'primary.main',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        '@keyframes pulse': {
                          '0%, 100%': {
                            opacity: 1,
                          },
                          '50%': {
                            opacity: 0.5,
                          },
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h5" fontWeight="bold">
                    Active Tasks
                  </Typography>
                  <Chip
                    label={activeTodos.length}
                    color="primary"
                    sx={{ ml: 'auto', fontWeight: 700 }}
                  />
                </Box>
                <TodoList
                  todos={activeTodos}
                  filter="pending"
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      bgcolor: 'success.50',
                      borderRadius: 2,
                    }}
                  >
                    <FiberManualRecordIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold">
                    Completed Tasks
                  </Typography>
                  <Chip
                    label={completedTodos.length}
                    color="success"
                    sx={{ ml: 'auto', fontWeight: 700 }}
                  />
                </Box>
                <TodoList
                  todos={completedTodos}
                  filter="completed"
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
