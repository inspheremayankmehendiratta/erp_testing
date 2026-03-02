'use client';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { filterMenuByRole } from "@/lib/filterMenuByRole";
import { Role } from "@/modules/shared/config/roles";

import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { menuItems, MenuItem } from '@/modules/shared/menu';
import { APPIMAGES, CONSTANTS } from '@/modules/shared/config/config';
import { Grid } from '@mui/material';
import Image from 'next/image';



interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  isMinimized?: boolean;
}

const Drawer = ({ open = true, onClose, isMinimized = false }: DrawerProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.roleCode as Role;
  const filteredMenuItems = role
    ? filterMenuByRole(menuItems, role)
    : [];
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const drawerWidth = isMobile ? CONSTANTS.DRAWER_WIDTH : isMinimized ? CONSTANTS.DRAWER_WIDTH_MINI : CONSTANTS.DRAWER_WIDTH;

  const handleExpandToggle = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  const renderMenuItem = (item: MenuItem, isNested = false) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.path ? pathname === item.path : false;

    // Auto-expand parent if any child is active
    const hasActiveChild = item.children?.some((child) => child.path && pathname === child.path);
    const shouldBeExpanded = isExpanded || (hasActiveChild && !isMinimized);

    if (isMobile || !isMinimized) {
      // Normal view: expanded drawer or mobile
      return (
        <Box key={item.id}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => {
                handleMenuItemClick(item);
                if (hasChildren) handleExpandToggle(item.id);
              }}
              sx={{
                minHeight: 48,
                justifyContent: isMinimized ? 'center' : 'initial',
                px: 2.5,
                mx: 1,
                borderRadius: '0px',
                mb: 0.5,
                fontWeight: isActive || hasActiveChild ? '600' : '400',
                fontSize: '14px',
                backgroundColor: isActive || hasActiveChild ? 'var(--mui-palette-primary-100)' : 'transparent',
                color: isActive || hasActiveChild ? theme.palette.primary.main : 'inherit',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: isActive || hasActiveChild ? 'var(--mui-palette-primary-100)' : 'var(--mui-palette-primary-100)',
                  color: theme.palette.primary.main,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isMinimized ? 'auto' : 2,
                  justifyContent: 'center',
                  color: isActive || hasActiveChild ? theme.palette.primary.main : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isMinimized && <ListItemText sx={{ fontWeight: isActive || hasActiveChild ? '600' : '400' }} primary={item.label} />}
              {!isMinimized && hasChildren && (
                <Box sx={{ ml: 'auto', color: isActive || hasActiveChild ? theme.palette.primary.main : 'inherit' }}>
                  {shouldBeExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>
              )}
            </ListItemButton>
          </ListItem>

          {/* Nested items */}
          {hasChildren && !isMinimized && (
            <Collapse in={shouldBeExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children?.map((child) => {
                  const isChildActive = child.path ? pathname === child.path : false;
                  return (
                    <ListItem key={child.id} disablePadding>
                      <ListItemButton
                        onClick={() => handleMenuItemClick(child)}
                        sx={{
                          pl: 7,
                          mx: 1,
                          borderRadius: '0px',
                          mb: 0.3,
                          fontWeight: isActive || hasActiveChild ? '600' : '400',
                          fontSize: '14px',
                          backgroundColor: isChildActive ? 'var(--mui-palette-primary-100)' : 'transparent',
                          color: isChildActive ? theme.palette.primary.main : 'inherit',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: isChildActive ? 'var(--mui-palette-primary-100)' : 'var(--mui-palette-primary-100)',
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          )}
        </Box>
      );
    } else {
      // Mini variant: show tooltip with children on hover
      if (hasChildren) {
        return (
          <Box key={item.id}>
            <Tooltip
              title={
                <Box sx={{ py: 1 }}>
                  <List dense sx={{ p: 0 }}>
                    {item.children?.map((child) => {
                      const isChildActive = child.path ? pathname === child.path : false;
                      return (
                        <ListItem
                          key={child.id}
                          disablePadding
                          sx={{
                            py: 0.5,
                            backgroundColor: isChildActive ? 'var(--mui-palette-primary-100)' : 'transparent',
                            borderRadius: '0px',
                            mb: 0.3,
                            fontWeight: isActive || hasActiveChild ? '600' : '400',
                            fontSize: '14px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'var(--mui-palette-primary-100)',
                            },
                          }}
                        >
                          <ListItemButton
                            dense
                            onClick={() => handleMenuItemClick(child)}
                            sx={{
                              py: 0.5,
                              color: isChildActive ? theme.palette.primary.main : 'inherit',
                            }}
                          >
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              }
              placement="right"
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: theme.shadows[8],
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    p: 1,
                    minWidth: '180px',
                  },
                },
              }}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    mx: 0.5,
                    fontWeight: isActive || hasActiveChild ? '600' : '400',
                    fontSize: '14px',
                    borderRadius: '0px',
                    backgroundColor: isActive || hasActiveChild ? theme.palette.primary.main : 'transparent',
                    color: isActive || hasActiveChild ? theme.palette.primary.main : 'inherit',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'var(--mui-palette-primary-100)',
                      color: theme.palette.primary.main,
                    },
                  }}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      color: isActive || hasActiveChild ? theme.palette.primary.main : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </Box>
        );
      } else {
        // No children, just show icon
        return (
          <Tooltip key={item.id} title={item.label} placement="right" arrow>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => handleMenuItemClick(item)}
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                  mx: 0.5,
                  fontWeight: isActive || hasActiveChild ? '600' : '400',
                  fontSize: '14px',
                  borderRadius: '0px',
                  backgroundColor: isActive ? 'var(--mui-palette-primary-100)' : 'transparent',
                  color: isActive ? theme.palette.primary.main : 'inherit',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-primary-100)',
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: isActive ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        );
      }
    }
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--mui-palette-primary-light)' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
        }}
      >
        {!isMinimized &&
          <Grid sx={{ mt:1, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image
              width={180}
              height={50}
              src={APPIMAGES.LOGO}
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
              alt="Logo" />
          </Grid>
        }
      </Box>
      <Box sx={{ flexGrow: 1, maxHeight: '100vh', overflowY: 'auto', mt: 2 }}>
        <List
          sx={{
            flexGrow: 1,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          {filteredMenuItems.map((item) => renderMenuItem(item))}
        </List>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <MuiDrawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: CONSTANTS.DRAWER_WIDTH,
            borderRadius: 0,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </MuiDrawer>
    );
  }

  return (
    <MuiDrawer
      anchor="left"
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          borderRadius: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </MuiDrawer>
  );
};

export default Drawer;