import { useState, useRef } from 'react';
import { Box, Chip, TextField, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const TagInput = ({ 
  value = [], 
  onChange, 
  placeholder = 'Add tags...',
  maxTags = 10,
  sx,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const tag = inputValue.trim().toLowerCase();
    
    if (tag && !value.includes(tag) && value.length < maxTags) {
      onChange([...value, tag]);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag();
    }
  };

  return (
    <Box sx={sx}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <LocalOfferIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body2" fontWeight="medium" color="text.primary">
          Tags (optional)
        </Typography>
      </Box>
      
      <Box
        onClick={() => inputRef.current?.focus()}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          padding: 1.5,
          border: '2px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          minHeight: 48,
          cursor: 'text',
          '&:focus-within': {
            borderColor: 'primary.main',
          },
        }}
      >
        {value.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => removeTag(index)}
            color="primary"
            size="small"
            sx={{
              fontWeight: 600,
            }}
          />
        ))}
        
        {value.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={value.length === 0 ? placeholder : ''}
            style={{
              flex: 1,
              minWidth: '120px',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          />
        )}
      </Box>
      
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
        Press Enter or comma to add tags. {value.length}/{maxTags} tags
      </Typography>
    </Box>
  );
};

export default TagInput;
