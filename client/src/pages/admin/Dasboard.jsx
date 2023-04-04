import React, { useState } from 'react'
import { CustomTable } from "../../components/common/CustomTable"
import { useGetQuery } from '../../hooks/useGetQuery'
import { usePostQuery } from '../../hooks/usePostQuery'
import { usePutQuery } from '../../hooks/usePutQuery'
import { Message } from '../../components/common/Message'

const columns = [
  { field: "name", headerName: "Name", step: 1, type: "text" },
  { field: "description", headerName: "Description", step: 1, type: "text" },
  { field: "phoneNumber", headerName: "Phone", step: 1, type: "text"},
  { field: "price", headerName: "Price", step: 1, type: "text"},
  { field: "openingHours", headerName: "Opening hours", step: 1, type: "time-picker"},
  { field: "photo", headerName: "Photo", step: 1, type: "upload"},
  { field: "location", headerName: "Location", step: 2, type: "location"},
  { field: "facilities", headerName: "Facilities", step: 3, type: "multi-select"}
]

export const Dasboard = ({ user }) => {
  const [formData, setFormData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);


  const { data, error } = useGetQuery('api/Campings')
  const  {putRequest, response, loading: loadingAdd, error: errorAdd } = usePutQuery(
    `api/Campings/${selectedRow?.id}`, 
    {
      ...selectedRow,
      name: formData?.name,
    }
  )
  return (
    <div>
        <h1>Campings list</h1>
        <Message 
          showMessage={error} 
          type="error" 
          message="Locatiile nu au putut fi incarcate!" 
        />
        <CustomTable 
          columns={columns} 
          data={data} 
          formData={formData} 
          setFormData={setFormData}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          onEdit={putRequest}
        />
    </div>
  )
}