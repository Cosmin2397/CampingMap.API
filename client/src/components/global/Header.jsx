import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useGetQuery } from '../../hooks/useGetQuery'
import { useNavigate } from 'react-router-dom';

import "../../style/Header.scss";

const MAIN_PAGES = [
  { text: "Home", url: "/" },
  { text: "Campings", url: "/campings" }, 
];

const SETTINGS = [
  { text: "Dashboard", url: "/dashboard" }, 
  { text: "Add camping", url: "/dashboard/add-camping" },
  { text: "Logout", url: "#" }
];

export function Header({ user, type, open, setOpen, loadingUser }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate()

  const {getRequest: logoutRequest, response: logoutResponse} = useGetQuery('Auth/logout')


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (page) => {
    logoutRequest()
    navigate(0)
    setTimeout(() => {
      navigate('/sign-in')
    }, 3000)
  }

  if(loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <AppBar position="static" open={open} 
      sx={{
        backdropFilter: 'blur(12px)',
        top: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="logo"
          >
            <NavLink to="/">LOGO</NavLink  >
          </Typography>
            
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {MAIN_PAGES.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <NavLink to={page.url}>{page.text}</NavLink  >
                </MenuItem>
              ))}
            </Menu>
          </Box>
        
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            className="logo"
          >
            <NavLink   to="/">LOGO</NavLink  >
          </Typography>
         
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {MAIN_PAGES.map((page) => (
            <Button
              key={page.text}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <NavLink to={page.url}>{page.text}</NavLink  >
            </Button>
          ))}
        </Box>
          
        

          <Box sx={{ flexGrow: 0 }}>
            { (user && user?.isAuthenticated) && !loadingUser ? 
              (
                <>
                  <Tooltip title="Open user menu">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user?.userName} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {SETTINGS.map((setting) => (
                      <MenuItem key={setting.text} onClick={handleCloseUserMenu} className="user-menu">
                        { setting.text === 'Logout' ? 
                          <NavLink to={setting.url} onClick={handleLogout}>{setting.text}</NavLink> :
                          <NavLink to={setting.url}>{setting.text}</NavLink>  
                        }
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )
              :
              (
               <NavLink to='/sign-in'>
                  <Button variant="outlined" startIcon={<Person2OutlinedIcon />}>
                    Login
                  </Button>
               </NavLink>
              )

            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}