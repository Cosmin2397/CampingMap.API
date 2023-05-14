import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const CustomModal = ({ title, content, open, handleSave, handleClose }) => {

  return (
    <div>
      <Modal
        aria-labelledby={title}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h5" component="h3" display="flex" justifyContent="space-between">
              { title }
              <CloseIcon onClick={handleClose} sx={{'cursor': 'pointer' }} color='primary'/>
            </Typography>
            <Typography sx={{ mt: 2 }}>
                { content }
            </Typography>
            { handleSave && 
              (
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                  <Button size="small" variant="text" color="error" onClick={handleClose}>Cancel</Button>
                  <Button size="small" variant="text" color="primary" onClick={(data) => handleSave(data)}>Save</Button>
                </Stack>
              )
            }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
