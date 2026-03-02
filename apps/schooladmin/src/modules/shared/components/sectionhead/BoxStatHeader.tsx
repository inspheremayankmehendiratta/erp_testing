import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatCardItemProps {
  title: string;
  value: string | number;
  bgColor?: string;
  textColor?: string;
  children?: React.ReactNode;
}

const BoxStatHeader: React.FC<StatCardItemProps> = ({
  title,
  value,
  bgColor = '#f5f7ff',
  textColor = '#111',
  children,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: 2,
        backgroundColor: bgColor,
      }}
    >
      {/* Left */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          {title}
        </Typography>

        <Typography variant="h6" fontWeight={700} sx={{ color: textColor }}>
          {value}
        </Typography>
      </Box>

      {/* Right Icon Slot */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {children}
      </Box>
    </Box>
  );
};

export default BoxStatHeader;
