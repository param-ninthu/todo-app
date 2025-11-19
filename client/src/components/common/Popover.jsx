import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Popover = ({ 
  trigger, 
  children, 
  title,
  isOpen: controlledIsOpen,
  onOpenChange,
  maxWidth = 'sm',
}) => {
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : false;
  const setIsOpen = onOpenChange || (() => {});

  return (
    <>
      <Box onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </Box>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth={maxWidth}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        {title && (
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'primary.50',
              borderBottom: '2px solid',
              borderColor: 'grey.100',
            }}
          >
            <Box component="span" fontWeight="bold">
              {title}
            </Box>
            <IconButton
              onClick={() => setIsOpen(false)}
              size="small"
              sx={{
                color: 'grey.600',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent sx={{ mt: 2 }}>
          {typeof children === 'function' 
            ? children({ close: () => setIsOpen(false) })
            : children
          }
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Popover;
