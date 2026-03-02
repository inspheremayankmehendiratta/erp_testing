'use client';

import Box from '@mui/material/Box';
import React from 'react';
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box>{children}</Box>
  );
}