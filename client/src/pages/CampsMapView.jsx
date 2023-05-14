import React, { useState, useEffect, useContext } from 'react'
import { CampsMap } from '../components/CampsMap'
import { CampsList } from '../components/CampsList'
import { useGetQuery } from '../hooks/useGetQuery'
import Fab from '@mui/material/Fab'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { CustomModal } from '../components/global/CustomModal'
import { AddCampReview } from '../components/AddCampReview'
import { UserContext } from '../context/UserContext'

export const CampsMapView = () => {
  const [showList, setShowList] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCamp, setSelectedCamp] = useState(null)

  const { authUser, loadingAuthUser } = useContext(UserContext)

  const {getRequest, data, loading, error} = useGetQuery('Campings')

  useEffect(() => {
    getRequest()
  }, [])

  const handlSwitchView = () => {
    setShowList(!showList)
  }

  const handleOpenReviewModal = (camp) => {
    setSelectedCamp(camp)
    setOpenModal(true)
  }

  const handleCloseReviewModal = () => {
    setOpenModal(false)
    if(!openModal) {
      setSelectedCamp(null)
    }
  }

  return (
    <div className='camps-view'>
      { showList ?
        <CampsList 
          camps={data} 
          loading={loading}
          error={error} 
          handleOpenReviewModal={handleOpenReviewModal}
          authUser={authUser}
          loadingAuthUser={loadingAuthUser}
        /> :
        <CampsMap 
          camps={data} 
          loading={loading} 
          error={error}
          selectedCamp={selectedCamp}
          setSelectedCamp={setSelectedCamp}
          handleOpenReviewModal={handleOpenReviewModal}
        />
      }
       <Fab variant="extended" size="medium" color="primary" onClick={handlSwitchView}>
        { showList ?  
           <>
              <MapOutlinedIcon sx={{ mr: 1 }} />
              Show Map
            </> :
             <>
             <FormatListBulletedOutlinedIcon sx={{ mr: 1 }} />
             Show List
           </>  
        }
      </Fab>
      <CustomModal 
        title={`Add review for ${selectedCamp?.name} camp`}
        content={<AddCampReview campingId={selectedCamp?.id} userId={authUser?.userId} closeModal={handleCloseReviewModal}/>}
        open={openModal}
        handleClose={handleCloseReviewModal}
      />
    </div>
  )
}
