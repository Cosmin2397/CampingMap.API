import React from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Footer = () => {
  return (
    <>
    <Divider />
    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
      <Typography color="primary" component="b">CAMPINGS FINDER</Typography>
      <Typography color="inherit" variant="body2" display='flex' alignItems='center' justifyContent='center'>
        Made with <FavoriteIcon color="error" sx={{ mx: 1 }}/> in Cluj-Napoca
      </Typography>
    </Typography>
    </>
  )
}