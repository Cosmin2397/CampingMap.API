import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { Header } from "../components/global/Header"
import Container from '@mui/material/Container';

export const AdminLayout = ({ user }) => {
  const location = useLocation()

  if(!user || Object.keys(user).length === 0) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  
  return (
    <div className='admin-layout'>
      <Header user={user} type="admin"/>
      <main>
        <Container sx={{ padding: '30px' }}>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}