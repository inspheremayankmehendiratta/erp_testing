'use client';

import React from 'react';
import { Tabs, Tab, Paper, useTheme, useMediaQuery } from '@mui/material';

interface CustomTabsProps {
  tabs: string[];
  activeIndex: number;
  onTabClick: (index: number) => void;
  bgColor?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  activeIndex,
  onTabClick,
  bgColor,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const tabStyles = {
    textTransform: 'none',
    fontWeight: 600,
    height: '100%',
    whiteSpace: 'nowrap',
    '&:first-child': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    '&:last-child': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    minWidth: {
      xs: 160,
      sm: 200,
      md: 'auto',
    },

    px: {
      xs: 0.5,
      sm: 1,
      md: 1.5,
    },


    fontSize: {
      xs: '0.85rem',
      sm: '0.9rem',
      md: '1rem',
    },

    color: theme.palette.text.secondary,

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },

    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  };

  return (
    <Paper
      sx={{
        backgroundColor: bgColor ?? theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Tabs
        value={activeIndex}
        onChange={(_, newIndex) => onTabClick(newIndex)}
        variant={isDesktop ? 'fullWidth' : 'scrollable'}
        scrollButtons={isDesktop ? false : 'auto'}
        allowScrollButtonsMobile
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none', 
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            label={tab}
            value={index}
            sx={tabStyles}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default CustomTabs;
