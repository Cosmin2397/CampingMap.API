import React, { useContext } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { Header } from "../components/global/Header"
import Container from '@mui/material/Container';
import { UserContext } from '../context/UserContext'

export const AdminLayout = () => {
  const location = useLocation()
  const { authUser, loadingAuthUser } = useContext(UserContext)

  if(authUser && !authUser?.isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }
  
  return (
    <div className='admin-layout'>
      <Header user={authUser} loadingUser={loadingAuthUser} type="admin"/>
      <main>
        <Container sx={{ padding: '30px' }}>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}