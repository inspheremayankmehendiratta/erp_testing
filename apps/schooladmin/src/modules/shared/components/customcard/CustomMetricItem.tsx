'use client';

import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface CustomMetricItemProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  iconColor?: string;
}

export const CustomMetricItem = ({
  label,
  value,
  icon,
  iconColor = 'primary.main',
}: CustomMetricItemProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Left */}
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={500}
        >
          {label}
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          mt={0.5}
        >
          {value}
        </Typography>
      </Box>

      {/* Right Icon */}
      {icon && (
        <Box
          sx={{
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
          }}
        >
          {icon}
        </Box>
      )}
    </Box>
  );
};


