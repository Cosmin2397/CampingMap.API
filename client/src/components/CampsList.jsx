import React from 'react'
import Grid from '@mui/material/Grid';
import { CampCard } from './CampCard'

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
    <Grid container rowSpacing={3} columnSpacing={3} sx={{ padding: '25px' }}>
        { camps?.map(camp => (
          <Grid item xs={12} md={4}>
            <CampCard 
              camp={camp} 
              loadingCamps={loadingCamps}
              handleOpenReviewModal={handleOpenReviewModal}
              authUser={authUser}
              loadingAuthUser={loadingAuthUser}
              handleOpenCampDrawer={handleOpenCampDrawer}
              addReviewAllowed={addReviewAllowed}
            />
          </Grid>
        )) }
    </Grid>
  )
}