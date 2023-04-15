import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { usePostQuery } from '../../hooks/usePostQuery'
import { Message } from '../common/Message'


export const SignUp = () => {
    const [userData, setUserData] = useState({})
    const  {postRequest, response: responseAdd,  error: errorAdd } = usePostQuery(
        `Auth/signUp`, 
        userData
    )

    const RequestMessage = () => {
        return (
         !!responseAdd && !!userData ?   
           <Message 
             showMessage={responseAdd} 
             type="success" 
             message="Account was successfully created" 
           />
           :
           (
             <Message 
               showMessage={errorAdd} 
               type="error" 
               message={errorAdd?.response?.data ?? "Couldn't create account, check the form"}
             />
           )
        )
       }
    
    const handleFormChange = (event) => {
        setUserData(prevState => ({
        ...prevState,
        [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        postRequest()
        if(responseAdd) {
            setUserData({})
        }

    };
  return (
    <Box
        sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <RequestMessage />
        
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="FirstName"
                value={userData?.firstName}
                onChange={handleFormChange}
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="LastName"
                value={userData?.lastName}
                onChange={handleFormChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="Username"
                value={userData?.Username}
                onChange={handleFormChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                value={userData?.email}
                onChange={handleFormChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userData?.password}
                onChange={handleFormChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Create account
            </Button>
        </Box>
    </Box>
  )
}