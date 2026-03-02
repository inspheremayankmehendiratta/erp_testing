import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface BoxHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  showDots?: boolean;
  showDivider?: boolean;
  rightContent?: React.ReactNode;
}

const BoxHeader: React.FC<BoxHeaderProps> = ({
  icon,
  title,
  showDots,
  showDivider = false,
  rightContent,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: showDivider ? 1.5 : 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon && <Box>{icon}</Box>}
          {title && (
            <Typography variant="subtitle1" fontWeight={600}>
              {title}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {rightContent}
          {showDots && (
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {showDivider && <Divider sx={{
        mx: -2,
        marginBottom:1.5,
      }} />}
    </>
  );
};

export default BoxHeader;
