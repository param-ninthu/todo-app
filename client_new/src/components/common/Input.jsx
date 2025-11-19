import TextField from '@mui/material/TextField';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  multiline = false,
  rows = 1,
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      type={type}
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      error={!!error}
      helperText={error}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      variant="outlined"
      sx={{
        padding: 3,
      }}
      {...props}
    />
  );
};

export default Input;
