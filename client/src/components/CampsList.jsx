import React from 'react'
import Grid from '@mui/material/Grid';
import { CampCard } from './CampCard'
import { CardSkeleton } from './global/skeleton/CardSkeleton';

export const CampsList = ({ 
  camps, 
  loading: loadingCamps, 
  error: errorCamps, 
  handleOpenReviewModal,
  authUser,
  loadingAuthUser,
  handleOpenCampDrawer,
  addReviewAllowed
}) => {
  return (
    <Grid container rowSpacing={3} columnSpacing={3} sx={{ px: 4, py: 8 }}>
      { loadingCamps ? 
        (
          <>
            <Grid item xs={12} md={4}>
              <CardSkeleton />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardSkeleton />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardSkeleton />
            </Grid>
          </>
        ) :
        camps?.map(camp => (
          <Grid item xs={12} md={4} key={camp?.id}>
            <CampCard 
              camp={camp} 
              handleOpenReviewModal={handleOpenReviewModal}
              authUser={authUser}
              loadingAuthUser={loadingAuthUser}
              handleOpenCampDrawer={handleOpenCampDrawer}
              addReviewAllowed={addReviewAllowed}
            />
          </Grid>
          )) 
        }
    </Grid>
  )
}