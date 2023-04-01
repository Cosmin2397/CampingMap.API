import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from "../components/global/Header"

export const MainLayout = ({ user }) => {
  return (
    <div className='main-layout'>
      <Header user={user} type="main"/>
      <main><Outlet /></main>
    </div>
  )
}