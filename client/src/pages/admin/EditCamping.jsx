import React, { useEffect } from 'react'
import { ManageCampingForm } from '../../components/ManageCampingForm';
import { useParams, Navigate } from 'react-router-dom';
import { useGetQuery } from '../../hooks/useGetQuery'
import { Message } from '../../components/common/Message'
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';


export const EditCamping = () => {
    const { id } = useParams()
    const { getRequest, data, loading: loadingCamping, error } = useGetQuery(`Campings/${id}`)

    useEffect(() => {
      getRequest()
    }, [])

    if((!id || error)) {
        return <Navigate to="/dashboard" replace />
      }
      

  return (
    <div>
      { error && (
         <Message 
         showMessage={error} 
         type="error" 
         message="Can't load camping information!" 
       />
      ) }

      <>
        <Typography variant="h4" display="flex" gap={2} alignItems="center" sx={{ mb: 4 }}>
          Edit camping: { loadingCamping ? <Skeleton animation="wave" width={250} height={50} /> : data?.name }
        </Typography>
        <ManageCampingForm data={data} type='edit' loadingCamping={loadingCamping}/>
      </>
    </div>
  )
}