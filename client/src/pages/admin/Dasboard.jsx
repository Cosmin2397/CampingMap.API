import React, { useEffect, useState } from 'react'
import { CustomTable } from "../../components/common/CustomTable"
import { useGetQuery } from '../../hooks/useGetQuery'
import { usePutQuery } from '../../hooks/usePutQuery'
import { Message } from '../../components/common/Message'
import { useDeleteQuery } from '../../hooks/useDeleteQuery'
import dayjs from 'dayjs';

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
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [openingHours, setOpeningHours] = useState({ start: null, end: null }
);
const [location, setLocation] = useState(selectedRow?.location);
const [campingFacilities, setCampingFacilities] = useState();

useEffect(() => {
  if(selectedRow?.location && !location) {
    setLocation(selectedRow?.location)
  }
}, [selectedRow, location]);

useEffect(() => {
  if(selectedRow?.facilties && !campingFacilities) {
    setCampingFacilities(selectedRow?.facilties)
  }
}, [selectedRow, campingFacilities]);

  const updatedCampingData = {
    ...formData,
    price: formData ? formData.price : selectedRow.price,
    openingHours: formData ? 
    `${dayjs(openingHours?.start, "HH:mm")} - ${dayjs(openingHours?.end, "HH:mm")}` : 
    selectedRow.openingHours,
    location,
    facilities: campingFacilities
  }


  const { getRequest, data, error } = useGetQuery('Campings/userCampings')

  const  {deleteRequest, response: responseDelete, error: errorDelete } = useDeleteQuery(
    `Campings/${selectedRow?.id}`
  )

  useEffect(() => {
    getRequest()
  }, [])

  const onDelete = () => {
    deleteRequest()
    if(responseDelete) {
      getRequest()
    }
  }

  return (
    <div>
        <h1>Campings list</h1>
        <Message 
          showMessage={error} 
          type="error" 
          message="Server error, camping could not be loaded!" 
        />
        { responseDelete?.status === 200 ? 
          <Message 
            showMessage={responseDelete} 
            type="success" 
            message={`Camping was successfully deleted!`}
          />
          :
          <Message 
              showMessage={errorDelete} 
              type="error" 
              message="Camping could not be deleted!"
          />
        }
        <CustomTable 
          columns={columns} 
          data={data} 
          setFormData={setFormData}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          openingHours={openingHours}
          onDelete={onDelete}
        />
    </div>
  )
}