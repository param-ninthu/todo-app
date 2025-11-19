import { Box, Button, Chip } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TodoFilter = ({ activeFilter, onFilterChange, stats }) => {
  const filters = [
    { key: 'all', label: 'All', icon: PlaylistAddCheckIcon, count: stats.total },
    { key: 'pending', label: 'Active', icon: RadioButtonUncheckedIcon, count: stats.pending },
    { key: 'completed', label: 'Completed', icon: CheckCircleIcon, count: stats.completed },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {filters.map(({ key, label, icon: Icon, count }) => (
        <Button
          key={key}
          onClick={() => onFilterChange(key)}
          variant={activeFilter === key ? 'contained' : 'outlined'}
          startIcon={<Icon />}
          fullWidth
          sx={{
            justifyContent: 'space-between',
            py: 1.5,
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          <Box component="span">{label}</Box>
          <Chip
            label={count}
            size="small"
            color={activeFilter === key ? 'default' : 'primary'}
            sx={{
              minWidth: 32,
              fontWeight: 700,
              backgroundColor: activeFilter === key ? 'rgba(255,255,255,0.3)' : undefined,
            }}
          />
        </Button>
      ))}
    </Box>
  );
};

export default TodoFilter;
