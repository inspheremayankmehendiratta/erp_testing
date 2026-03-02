import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface CardProps {
  children?: React.ReactNode;
  bgcolor?: string;
  borderRadius?: number | string;
  padding?: number | string;
  boxShadow?: number;
  marginTop?: number;
  styles?: React.CSSProperties;
}

export const CustomCard: React.FC<CardProps> = ({
  children,
  padding = '24px',
  marginTop = 2,
  bgcolor,
  styles,
}) => {
  const theme = useTheme();
  
  const BoxStyling = {
    backgroundColor: bgcolor || theme.palette.background.paper,
    borderRadius: '12px',
    padding: padding,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
    marginTop: marginTop,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      borderColor: theme.palette.primary.light,
    },
  };

  return <Box sx={{ ...BoxStyling, ...styles }}>{children}</Box>;
};

