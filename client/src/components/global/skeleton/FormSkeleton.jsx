import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const FormSkeleton = () => {
  return (
    <div>
      <Skeleton
        animation="wave"
        width="100%"
        height={0}
        style={{ marginBottom: 6 }}
      />
        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Skeleton animation="wave" width="100%" height={50} />
            <Skeleton animation="wave" width="100%" height={50} />
            <Skeleton animation="wave" width="100%" height={50} />
            <Skeleton animation="wave" width="100%" height={50} />
        </Stack>
        <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Skeleton animation="wave" width={260} height={50} />
            <Skeleton animation="wave" width={260} height={50} />
        </Stack>
    </div>
  )
}