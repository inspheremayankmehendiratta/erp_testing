'use client';

import React from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme, useColorScheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';

import { APPIMAGES } from '@/modules/shared/config/config';
import { AuthWrapperProps } from '../types';



export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  bgImage = "/images/img-auth-sideimg.png",
  className = ''
}) => {
  const theme = useTheme();
  const themeMode = useColorScheme();
  const isDark = themeMode.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid size={12} container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { minHeight: '100vh' }
          }}
        >
          <Grid sx={{ display: 'flex', alignSelf: 'center', justifyContent: 'flex-start', minHeight: '100vh', height: "100%" }} size={{ md: 6, lg: 7 }}>
            <CardMedia component="img" src={bgImage} alt="Authimg" sx={{ height: '100vh', minHeight: 1, backgroundColor: 'var(--mui-palette-primary-light)' }} />
          </Grid>
          <Grid sx={{ mx: { xs: 3, md: 0 }, display: 'flex', position: { xs: 'absolute', md: 'relative' }, flexDirection: 'column', alignItems: "center", backgroundColor: 'var(--mui-palette-primary-light2)', padding: "40px 30px", borderRadius: "20px" }} size={{ md: 6, lg: 5 }}>
            <Grid sx={{ mx: 3, justifyContent: 'center', width: "90%", maxWidth: "400px", alignItems: "center", display: 'flex', flexDirection: 'column' }}>
              <Grid sx={{ mb: 4 }}>
                <img src={isDark ? APPIMAGES.LOGO_DARK : APPIMAGES.LOGO} alt="Logo" />
              </Grid>
              {children}
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper;