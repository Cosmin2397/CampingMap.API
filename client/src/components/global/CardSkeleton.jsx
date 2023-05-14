import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export const CardSkeleton = () => {
  return (
    <div>
         <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
        />
         <Skeleton animation="wave" height={10} width="40%" />
         <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
    </div>
  )
}