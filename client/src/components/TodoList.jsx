import { Box } from '@mui/material';
import TodoItem from './TodoItem';
import EmptyState from './common/EmptyState';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const TodoList = ({ todos, onToggle, onUpdate, onDelete, filter }) => {
  if (todos.length === 0) {
    let emptyConfig = {
      title: 'No todos yet',
      description: 'Get started by creating your first todo!',
      icon: PlaylistAddCheckIcon,
    };

    if (filter === 'completed') {
      emptyConfig = {
        title: 'No completed todos',
        description: 'Complete some tasks to see them here!',
        icon: CheckCircleIcon,
      };
    } else if (filter === 'pending') {
      emptyConfig = {
        title: 'All caught up!',
        description: "You've completed all your tasks. Great job!",
        icon: CheckCircleIcon,
      };
    }

    return <EmptyState {...emptyConfig} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

export default TodoList;
