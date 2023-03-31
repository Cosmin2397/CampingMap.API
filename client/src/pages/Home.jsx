import React from 'react'
import { useFetch } from '../hooks/useFetch'

export const Home = () => {
  const {data,loading,error} = useFetch('https://localhost:7109/api/Campings')
  console.log({ data })
  return (
    <div>Home</div>
  )
}