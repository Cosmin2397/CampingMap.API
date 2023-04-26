import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { usePostQuery } from '../../hooks/usePostQuery'
import { Message } from '../common/Message'
import { useNavigate } from 'react-router-dom';


export const SignIn = () => {
    const [userData, setUserData] = useState({})
    const  {postRequest, loading: loadingLogin, response: responseLogin,  error: errorLogin } = usePostQuery(
        `Auth/login`, 
        userData
    )

    const navigate = useNavigate()

    if(responseLogin?.data?.isAuthenticated && !loadingLogin) {
        navigate(0)
        setTimeout(() => {
            navigate('/dashboard')
        }, 3000)
    }

    const RequestMessage = () => {
        return (
         !!responseLogin && !!userData && !loadingLogin ?   
           <Message 
             showMessage={responseLogin} 
             type="success" 
             message="Login was successfully" 
           />
           :
           (
             <Message 
               showMessage={errorLogin} 
               type="error" 
               message={errorLogin?.response?.data ?? "Couldn't login, check the form"}
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
        postRequest(true)
        if(responseLogin && !loadingLogin) {
            setUserData(null)
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
                Login
            </Button>
            <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
            </Grid>
            </Grid>
        </Box>
    </Box>
  )
}