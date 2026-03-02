'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { LogOut, Edit } from 'lucide-react';
import ThemeToggler from '@/modules/shared/theme/ThemeToggler';

interface HeaderProps {
  onMenuClick?: () => void;
  onToggleDrawer?: () => void;
  drawerWidth: number;
  isDrawerMinimized: boolean;
  DRAWER_TYPE?: 'horizontal' | 'vertical';
}

const Header = ({ onMenuClick, onToggleDrawer, drawerWidth, isDrawerMinimized, DRAWER_TYPE }: HeaderProps) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  // TODO: Replace with actual user data from context/store
  const user = {
    name: 'John Doe',
    designation: 'Administrator',
    image: 'https://i.pravatar.cc/40?img=3', // Placeholder image
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    // TODO: Implement logout logic
    await signOut({
      redirect: false, // control manually
    });

    // optional cleanup
    localStorage.removeItem("device_fingerprint_id");

    router.replace("/");
    handleClose();
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile page
    console.log('Edit profile clicked');
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        marginLeft: isMobile ? 0 : `${drawerWidth}px`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0px',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ padding: '12px 24px', minHeight: 64 }}>
        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{
              mr: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Desktop Expand/Collapse Icon */}
        {(!isMobile && DRAWER_TYPE == 'vertical') && (
          <Tooltip title={isDrawerMinimized ? 'Expand' : 'Collapse'} placement="right">
            <IconButton
              onClick={onToggleDrawer}
              edge="start"
              sx={{
                mr: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              color="inherit"
            >
              <ChevronRightIcon
                sx={{
                  transform: isDrawerMinimized ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shorter,
                  }),
                }}
              />
            </IconButton>
          </Tooltip>
        )}

        {/* Title */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: '1.125rem',
            letterSpacing: '-0.005em',
            color: theme.palette.text.primary,
          }}
        >
          School ERP
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        <ThemeToggler />
        {/* User Profile Menu */}
        <Tooltip title="User menu" slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -8] } }] } }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                cursor: 'pointer',
                border: `2px solid ${theme.palette.primary.main}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 0 0 4px ${theme.palette.primary.light}`,
                  transform: 'scale(1.05)',
                },
              }}
              alt={user.name}
              src={user.image}
            />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                mt: 1.5,
                minWidth: '280px',
                backgroundColor: theme.palette.background.paper,
                '& .MuiAvatar-root': {
                  width: 40,
                  height: 40,
                  ml: -0.5,
                  mr: 1,
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            disabled
            sx={{
              py: 1.5,
              px: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light}80 100%)`,
              borderRadius: '8px',
              margin: '8px',
              '&.Mui-disabled': {
                opacity: 1,
              },
            }}
          >
            <Avatar sx={{ mr: 2, width: 36, height: 36 }} src={user.image} alt={user.name} />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, letterSpacing: '0.5px', color: theme.palette.primary.main }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.primary.main, fontSize: '0.75rem', opacity: 0.8 }}
              >
                {user.designation}
              </Typography>
            </Box>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={handleEditProfile}
            sx={{
              py: 1.2,
              px: 2,
              borderRadius: '8px',
              margin: '4px 8px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                transition: 'color 0.3s ease',
              }}
            >
              <Edit size={18} strokeWidth={2} />
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Edit Profile
            </Typography>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.2,
              px: 2,
              borderRadius: '8px',
              margin: '4px 8px',
              transition: 'all 0.3s ease',
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: `${theme.palette.error.main}12`,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              <LogOut size={18} strokeWidth={2} />
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>

        {/* Add your header actions here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;