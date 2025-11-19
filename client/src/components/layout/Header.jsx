import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Header = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: 1.5,
              borderRadius: 2,
            }}
          >
            <CheckBoxIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 700, color: 'white' }}>
              TODO App
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Organize your tasks efficiently
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
