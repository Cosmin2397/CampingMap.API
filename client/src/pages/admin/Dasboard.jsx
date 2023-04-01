import React, { useState } from 'react'
import { CustomTable } from "../../components/common/CustomTable"

const columns = [
  { field: "firstName", headerName: "First Name" },
  { field: "lastName", headerName: "Last Name" },
  { field: "email", headerName: "Email"}
]

const data =[
  { firstName: "John", lastName: "Doe", email: "jogh@test.com"},
  { firstName: "John", lastName: "Doe", email: "jogh@test.com"}

]


export const Dasboard = ({ user }) => {
  return (
    <div>
        <h1>Campings list</h1>
        <CustomTable columns={columns} data={data} />
    </div>
  )
}