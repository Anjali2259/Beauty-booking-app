import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  CalendarToday,
  Logout,
  Business,
  Spa,
  Login,
  PersonAdd,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const menuItems = [
    { label: 'Services', path: '/services' },
    { label: 'Providers', path: '/providers' },
  ];

  const renderDesktopMenu = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{ fontWeight: 500 }}
        >
          {item.label}
        </Button>
      ))}

      {isAuthenticated ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {user?.avatar ? (
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.firstName?.[0]?.toUpperCase()}
              </Avatar>
            )}
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            startIcon={<Login />}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
            startIcon={<PersonAdd />}
            sx={{ color: 'white' }}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderMobileDrawer = () => (
    <Drawer
      anchor="right"
      open={mobileDrawerOpen}
      onClose={handleMobileDrawerToggle}
      sx={{ '& .MuiDrawer-paper': { width: 250 } }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleMobileDrawerToggle}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {isAuthenticated ? (
          <>
            <ListItem
              component={Link}
              to="/my-bookings"
              onClick={handleMobileDrawerToggle}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="My Bookings" />
            </ListItem>
            <ListItem
              component={Link}
              to="/profile"
              onClick={handleMobileDrawerToggle}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            {user?.role === 'provider' && (
              <ListItem
                component={Link}
                to="/provider/dashboard"
                onClick={handleMobileDrawerToggle}
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
            <ListItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              component={Link}
              to="/login"
              onClick={handleMobileDrawerToggle}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={handleMobileDrawerToggle}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  const renderProfileMenu = () => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/my-bookings">
        <CalendarToday sx={{ mr: 1 }} />
        My Bookings
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        <AccountCircle sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      {user?.role === 'provider' && (
        <MenuItem onClick={handleMenuClose} component={Link} to="/provider/dashboard">
          <Dashboard sx={{ mr: 1 }} />
          Dashboard
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'text.primary',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar>
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  flexGrow: 1,
                }}
              >
                <Spa sx={{ mr: 1, color: 'primary.main' }} />
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  BeautyBook
                </Typography>
              </Box>

              {isMobile ? (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                renderDesktopMenu()
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {renderMobileDrawer()}
      {renderProfileMenu()}
    </>
  );
};

export default Navbar;