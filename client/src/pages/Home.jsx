import React from 'react'
import { useGetQuery } from '../hooks/useGetQuery'

export const Home = () => {
  const {data,loading,error} = useGetQuery('api/Campings')
  console.log({ data })
  return (
    <div>Home</div>
  )
}