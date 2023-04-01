import React, { useState } from 'react'
import { CustomTable } from "../../components/common/CustomTable"
import { useGetQuery } from '../../hooks/useGetQuery'
import { usePostQuery } from '../../hooks/usePostQuery'
import { Message } from '../../components/common/Message'

const columns = [
  { field: "name", headerName: "Name" },
  { field: "description", headerName: "Description" },
  { field: "phoneNumber", headerName: "Phone"},
  { field: "openingHours", headerName: "Opening hours"}
]

export const Dasboard = ({ user }) => {
  const {data, error} = useGetQuery('api/Campings')
  const {response, loading: loadingAdd, error: errorAdd} = usePostQuery('api/Campings', data)
  return (
    <div>
        <h1>Campings list</h1>
        <Message 
          showMessage={error} 
          type="error" 
          message="Locatiile nu au putut fi incarcate!" 
        />
        <CustomTable columns={columns} data={data} />
    </div>
  )
}