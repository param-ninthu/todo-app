import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Button from './common/Button';
import TagInput from './common/TagInput';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editTags, setEditTags] = useState(todo.tags || []);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        tags: editTags,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditTags(todo.tags || []);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card
      className="animate-slideUp"
      sx={{
        borderRadius: 3,
        border: '2px solid',
        borderColor: todo.done ? 'success.light' : 'grey.300',
        backgroundColor: todo.done ? 'success.50' : 'background.paper',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
          borderColor: todo.done ? 'success.main' : 'primary.main',
        },
      }}
    >
      <CardContent>
        {isEditing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Todo title"
              fullWidth
              size="small"
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
              multiline
              rows={2}
              fullWidth
              size="small"
              inputProps={{ maxLength: 500 }}
            />
            <TagInput
              value={editTags}
              onChange={setEditTags}
              placeholder="Add tags..."
              maxTags={5}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                onClick={handleSave}
                startIcon={<CheckIcon />}
              >
                Save
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleCancel}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Checkbox
              checked={todo.done}
              onChange={() => onToggle(todo._id)}
              color="success"
              sx={{ mt: -1 }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? 'text.secondary' : 'text.primary',
                  wordBreak: 'break-word',
                }}
              >
                {todo.title}
              </Typography>
              
              {todo.description && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    color: todo.done ? 'text.disabled' : 'text.secondary',
                    textDecoration: todo.done ? 'line-through' : 'none',
                    wordBreak: 'break-word',
                  }}
                >
                  {todo.description}
                </Typography>
              )}

              {todo.tags && todo.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1.5 }}>
                  {todo.tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
                      label={tag}
                      size="small"
                      color={todo.done ? 'default' : 'primary'}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  ))}
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EventIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(todo.createdAt)}
                  </Typography>
                </Box>
                {todo.updatedAt !== todo.createdAt && (
                  <Typography variant="caption" color="text.disabled">
                    Updated: {formatDate(todo.updatedAt)}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                opacity: 0,
                transition: 'opacity 0.2s',
                '.MuiCard-root:hover &': {
                  opacity: 1,
                },
              }}
            >
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                color="primary"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.50',
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(todo._id)}
                color="error"
                sx={{
                  '&:hover': {
                    backgroundColor: 'error.50',
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoItem;
