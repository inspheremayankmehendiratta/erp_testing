"use client";

import { ReactNode, useState } from 'react';

import { CONSTANTS, DRAWER_TYPE } from '@/modules/shared/config/config';
import Box from '@mui/material/Box';
import { useSession } from "next-auth/react";
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Footer from '../Footer';
import Header from '../Header';
import Drawer from '../Drawer';


const ProtectedClient = ({ children }: { children: ReactNode }) => {
    const theme = useTheme();
    const { data, status } = useSession();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isDrawerMinimized, setIsDrawerMinimized] = useState(false);

    const currentDrawerWidth = isDrawerMinimized ? CONSTANTS.DRAWER_WIDTH_MINI : CONSTANTS.DRAWER_WIDTH;

    // Calculate main content width based on drawer state
    const getMainWidth = () => {
        if (isMobile) return '100%';
        return `calc(100% - ${currentDrawerWidth}px)`;
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
                {/* Header */}
                <Header
                    onMenuClick={() => setMobileDrawerOpen(true)}
                    onToggleDrawer={() => setIsDrawerMinimized(!isDrawerMinimized)}
                    drawerWidth={currentDrawerWidth}
                    isDrawerMinimized={isDrawerMinimized}
                    DRAWER_TYPE={DRAWER_TYPE}
                />

                {/* Drawer */}
                {DRAWER_TYPE === 'vertical' &&
                    <Drawer
                        open={mobileDrawerOpen}
                        onClose={() => setMobileDrawerOpen(false)}
                        isMinimized={isDrawerMinimized}
                    />
                }


                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        width: getMainWidth(),
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Toolbar />
                    <Container
                        maxWidth={false}
                        sx={{
                            py: 3,
                            flexGrow: 1,
                            px: { xs: 2, sm: 3, md: 4 },
                        }}
                    >
                        {children}
                    </Container>
                    <Footer />
                </Box>
            </Box>
        </LocalizationProvider>
    );
};
export default ProtectedClient;