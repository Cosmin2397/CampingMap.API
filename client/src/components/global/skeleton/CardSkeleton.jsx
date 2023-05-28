import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const CardSkeleton = () => {
  return (
    <div>
      <Skeleton
        animation="wave"
        width="100%"
        height={0}
        style={{ marginBottom: 6 }}
      />
        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
          <div>
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <Skeleton animation="wave" height={40} width="100%" />
        </Stack>
        <Skeleton sx={{ height: 190, mb: 2 }} animation="wave" variant="rectangular" />
        <Skeleton animation="wave" height={40} style={{ mb: 6 }} />
        <Skeleton animation="wave" height={40}/>
        <Skeleton animation="wave" height={40} />
        <Stack direction="row" justifyContent="flex-end" spacing={4} sx={{ mb: 2 }}>
          <Skeleton animation="wave" width={80} height={50} />
          <Skeleton animation="wave" width={80} height={50} />
        </Stack>
    </div>
  )
}