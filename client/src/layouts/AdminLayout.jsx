import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from "../components/global/Header"
import Container from '@mui/material/Container';

export const AdminLayout = ({ user }) => {
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