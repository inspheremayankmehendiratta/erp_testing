'use client';

import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { PaletteMode } from '@mui/material';
import { theme as baseTheme } from '@/modules/shared/theme/theme';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [mode, setMode] = useState<PaletteMode>('light');

  const theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode: mode,
    },
  });

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
