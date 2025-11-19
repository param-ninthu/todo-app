import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from './common/Button';
import TagInput from './common/TagInput';

const TodoForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Please enter a title for your todo';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Please enter a title for your todo';
        } else if (value.trim().length < 3) {
          newErrors.title = 'Title must be at least 3 characters long';
        } else if (value.trim().length > 100) {
          newErrors.title = 'Title must be less than 100 characters';
        } else {
          delete newErrors.title;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ title: true });
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        tags: tags,
      });
      
      setTitle('');
      setDescription('');
      setTags([]);
      setErrors({});
      setTouched({});
      
      if (onClose) onClose();
    } catch (error) {
      console.error('Error creating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setErrors({});
    setTouched({});
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (touched.title) {
      validateField('title', value);
    }
  };

  const handleTitleBlur = () => {
    setTouched({ ...touched, title: true });
    validateField('title', title);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <TextField
          label="What needs to be done?"
          name="title"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          placeholder="e.g., Buy groceries"
          error={touched.title && !!errors.title}
          helperText={touched.title && errors.title}
          required
          fullWidth
          inputProps={{ maxLength: 100 }}
          sx={{ mt: 5 }}
        />
        <Typography 
          variant="caption" 
          color={title.trim().length < 3 && title.length > 0 ? 'error.main' : 'text.secondary'} 
          sx={{ mt: 0.5, display: 'block' }}
        >
          {title.length}/100 characters (minimum 3 characters)
        </Typography>
      </Box>
      
      <Box>
        <TextField
          label="Description (optional)"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          multiline
          rows={3}
          fullWidth
          inputProps={{ maxLength: 500 }}
          sx={{ mt: 5 }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
          {description.length}/500 characters
        </Typography>
      </Box>

      <TagInput
        value={tags}
        onChange={setTags}
        placeholder="Add tags..."
        maxTags={5}
        sx={{ mt: 5 }}
      />

      <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
        <Button
          type="submit"
          loading={isSubmitting}
          startIcon={<AddIcon />}
          fullWidth
        >
          Add Todo
        </Button>
        {(title || description || tags.length > 0) && (
          <Button
            type="button"
            variant="outlined"
            onClick={handleReset}
          >
            Clear
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TodoForm;
