import React from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';

import '../../style/Footer.scss'

export const Footer = () => {
  return (
    <footer>
    <Divider />
    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
      <div className="logo">
        <img src="/logo.png" alt="Campings finder logo" />
      </div>
      <Typography color="inherit" variant="body2" display='flex' alignItems='center' justifyContent='center'>
        Made with <FavoriteIcon color="error" sx={{ mx: 1 }}/> in Cluj-Napoca
      </Typography>
    </Typography>
    </footer>
  )
}