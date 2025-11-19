import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  startIcon,
  onClick,
  type = 'button',
  fullWidth = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      sx={{
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
