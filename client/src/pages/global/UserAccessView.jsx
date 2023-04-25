import React, { useState, useContext } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel } from '../../components/common/TabPanel';
import { SignIn } from '../../components/global/SignIn';
import { SignUp } from '../../components/global/SignUp';
import { UserContext } from '../../context/UserContext'
import { Navigate, useLocation } from 'react-router-dom'

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const UserAccessView = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation()
  const { authUser } = useContext(UserContext)

  if(authUser && authUser?.isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  const handleChange = (event, newtabIndex) => {
    setTabIndex(newtabIndex);
  };


  return (
    <div>
    <Grid container component="main" sx={{ height: '100vh' }}>
    <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
        backgroundImage: 'url(https://source.unsplash.com/xr-y6Ruw7K8)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <Tabs
      value={tabIndex}
      onChange={handleChange}
      aria-label="user access tabs"
      centered
    >
        <Tab icon={<LockOutlinedIcon />} label="Login" iconPosition="start"/>
        <Tab icon={<LockOutlinedIcon />} label="Create account" iconPosition="start"/>
       
    </Tabs>
     <TabPanel value={tabIndex} index={0}>
        <SignIn isLogin={tabIndex === 0}/>
    </TabPanel>
    <TabPanel value={tabIndex} index={1}>
        <SignUp />
    </TabPanel>
    <Copyright sx={{ mt: 5 }} />
    </Grid>
    </Grid>
      </div>
  );
}