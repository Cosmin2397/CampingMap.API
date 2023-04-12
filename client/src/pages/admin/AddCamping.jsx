import React from 'react'
import { ManageCampingForm } from '../../components/ManageCampingForm'

export const AddCamping = () => {
  return (
    <div>
        <h1>Add new camping</h1>
        <ManageCampingForm type='add' />
    </div>
  )
}