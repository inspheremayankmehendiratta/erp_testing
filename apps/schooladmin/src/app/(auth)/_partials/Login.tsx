'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Grid, Typography } from '@mui/material';

import NextLink from "next/link";

import LoginViaOTP from '@/modules/auth/forms/LoginViaOtp';
import AuthWrapper from '@/modules/auth/components/AuthWrapper';
import { LoginForm } from '@/modules/auth';



const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpScreen, setShowOtpScreen] = useState(false)
    return (
        <AuthWrapper>
            <Grid sx={{ width: '100%', }}>
                <Grid container sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h3">
                        Login
                    </Typography>
                    <Button
                        component={NextLink}
                        href="/register"
                        variant="text"
                        sx={{
                            textTransform: 'none',
                            color: 'primary.main',
                            '&:hover': {
                                color: 'primary.dark',
                            },
                        }}
                    >
                        Register
                    </Button>

                </Grid>
            </Grid>
            {showOtpScreen ? <LoginViaOTP isLoading={isLoading} setShowOtpScreen={setShowOtpScreen} /> :
                <LoginForm
                    //onSubmit={handleLogin}
                    error={error}
                    isLoading={isLoading}
                    setShowOtpScreen={setShowOtpScreen}
                />}
        </AuthWrapper>
    );
}

export default Login;