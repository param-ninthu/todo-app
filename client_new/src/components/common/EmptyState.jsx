import { Box, Typography, Paper } from '@mui/material';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const EmptyState = ({ 
  icon: Icon = PlaylistAddCheckIcon,
  title = 'No todos yet',
  description = 'Get started by creating your first todo!',
  action
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 4,
        border: '2px dashed',
        borderColor: 'grey.300',
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          backgroundColor: 'grey.100',
        }}
      >
        <Icon sx={{ fontSize: 56, color: 'grey.400' }} />
      </Box>
      <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ maxWidth: 400 }}>
        {description}
      </Typography>
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Paper>
  );
};

export default EmptyState;
