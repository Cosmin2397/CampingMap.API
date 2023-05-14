import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CardSkeleton } from './global/CardSkeleton';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider'


export const CampCard = ({ 
  camp, 
  loadingCamps, 
  handleOpenReviewModal,
  authUser,
  loadingAuthUser
}) => {

  return (
   <div>
    { loadingCamps || loadingAuthUser ?
    <CardSkeleton /> :
    (
      <>
      <Card>

          <CardHeader
            avatar={
              <Avatar src="/static/images/avatar/2.jpg" alt={authUser?.userName} />
            }
            title={authUser?.userName}
            subheader={<Chip label={authUser?.roles?.[0]} color="primary" variant="outlined" size="small" />}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://source.unsplash.com/xr-y6Ruw7K8"
            alt="Paella dish"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              { camp?.name }
            </Typography>
              <Rating name="camp-review" value={camp?.rating} readOnly />
              <Divider textAlign="left" sx={{ mb: 1 }}>Location</Divider>
              <Chip icon={<LocationOnIcon />} label={camp?.location?.adress} /> 
            
            <Divider textAlign="left" sx={{ mt: 2 }}>Description</Divider>
            <Typography variant="body2" color="text.secondary">
            { camp?.description }
            </Typography>
          </CardContent>
          <CardActions sx={{ "justifyContent": "flex-end", "padding": "15px" }}>
            <Button size="small" variant="text" color="secondary" onClick={() => handleOpenReviewModal(camp)}>Add review</Button>
            <Button size="small" variant="contained">View more</Button>
          </CardActions>
      </Card>
      </>
    )
  }
   </div>
  );
}
