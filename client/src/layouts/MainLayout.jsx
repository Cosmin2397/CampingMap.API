import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from "../components/global/Header"
import { Footer } from "../components/global/Footer"
import { UserContext } from '../context/UserContext'

export const MainLayout = ({ user }) => {
  const { authUser, loadingAuthUser } = useContext(UserContext)
  return (
    <div className='main-layout'>
      <Header user={authUser} loadingUser={loadingAuthUser} type="main"/>
      <main><Outlet /></main>
      <Footer />
    </div>
  )
}