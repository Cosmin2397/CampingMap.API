import React, { useEffect } from 'react'
import { ManageCampingForm } from '../../components/ManageCampingForm';
import { useParams, Navigate } from 'react-router-dom';
import { useGetQuery } from '../../hooks/useGetQuery'
import { Message } from '../../components/common/Message'


export const EditCamping = () => {
    const { id } = useParams()
    const { getRequest, data, loading, error } = useGetQuery(`api/Campings/${id}`)

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
      { loading ? <h1>Loading...</h1> :
        (
          <>
            <h1>Edit camping: {data?.name}</h1>
            <ManageCampingForm data={data} type='edit' />
          </>
        )
      }
      
    </div>
  )
}