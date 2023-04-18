import React, { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import '../../style/Common.scss'


export function Message({ showMessage, type, message }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(showMessage) {
        setOpen(true);
    }
  }, [showMessage])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      className={`message-${type}`}
    />
  );
}