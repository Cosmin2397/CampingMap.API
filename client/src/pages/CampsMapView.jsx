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
import { CampInfoDrawer } from '../components/CampInfoDrawer'

export const CampsMapView = () => {
  const [showList, setShowList] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedCamp, setSelectedCamp] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

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

  const handleOpenCampDrawer = (camp) => {
    setSelectedCamp(camp)
    setDrawerOpen(true)
  }

  const handleCloseCampDrawer = () => {
    setDrawerOpen(false)
    if(!drawerOpen) {
      setSelectedCamp(null)
    }
  }

  const addReviewAllowed = (campReviews) => {
    if(campReviews?.length) {
      return campReviews?.some(review => review?.userId !== authUser?.userId)
    }
    return true
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
          handleOpenCampDrawer={handleOpenCampDrawer}
          addReviewAllowed={addReviewAllowed}
        /> :
        <CampsMap 
          camps={data} 
          loading={loading} 
          error={error}
          selectedCamp={selectedCamp}
          setSelectedCamp={setSelectedCamp}
          handleOpenReviewModal={handleOpenReviewModal}
          handleOpenCampDrawer={handleOpenCampDrawer}
          authUser={authUser}
          addReviewAllowed={addReviewAllowed}
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
        content={<AddCampReview campingId={selectedCamp?.id} userId={authUser?.userId} closeModal={() => handleCloseReviewModal()}/>}
        open={openModal}
        handleClose={handleCloseReviewModal}
      />
      <CampInfoDrawer 
        selectedCamp={selectedCamp}
        drawerOpen={drawerOpen}
        handleDrawerClose={handleCloseCampDrawer}
      />
    </div>
  )
}
