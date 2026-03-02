'use client';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import Tooltip from "@mui/material/Tooltip";
import {
  Box,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import NextLink from "next/link";
import { LoginFormValues } from '../types';

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomInput } from '@/modules/shared/components/forms';

/**
 * Validation schema for login form
 */
const loginValidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .min(10, 'Mobile number must be at least 10 characters')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

interface LoginFormProps {
  initialValues?: Partial<LoginFormValues>;
  error?: string | null;
  isLoading?: boolean;
  setShowOtpScreen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  initialValues = {
    mobile: '',
    password: '',
    rememberMe: false,
  },
  error = null,
  isLoading = false,
  setShowOtpScreen
}) => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(error);
  
  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setSubmitError(null);
      const res:any = await signIn("password", {
      mobile: values.mobile,
      password: values.password,
      redirect: false, // IMPORTANT
    });

    console.log("SignIn Response:", res);

    if(res.status == 200) {
      router.replace("/dashboard");
    }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong';
      setSubmitError(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={initialValues as LoginFormValues}
      //validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
        <Form style={{ width: "100%" }} noValidate>
          {/* Error Alert */}
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          {/* mobile Field */}
          <Grid container spacing={3}>
            <Grid size={12}>
              <CustomInput
                id="mobile"
                name="mobile"
                label="Mobile Number"
                type="text"
                placeholder="Enter mobile address"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.mobile}
                error={errors.mobile}
                startAdornment={<EmailOutlinedIcon fontSize="small" />}
                endAdornment={<Tooltip title="Enter your registered email address" placement="top" arrow>
                  <InfoOutlinedIcon fontSize="small" style={{ cursor: "pointer" }} />
                </Tooltip>}
              />

              <CustomInput
                id="password"
                name="password"
                label="Password"
                required
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.password}
                error={errors.password}
                enablePasswordToggle
                startAdornment={<LockOutlinedIcon fontSize="small" />}
              />
            </Grid>
          </Grid>

          {/* Remember Me & Forgot Password */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  color="primary"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading || isSubmitting}
                  sx={{
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500 }}>
                  Remember me
                </Typography>
              }
            />
            <Link
              href="/forgot-password"
              component={NextLink}
              sx={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'primary.main',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.dark',
                },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading || isSubmitting}
            sx={{
              mb: 2,
              py: 1.5,
              fontSize: '0.9375rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover:not(:disabled)': {
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                opacity: 0.6,
              },
            }}
          >
            {isLoading || isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowOtpScreen?.(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9375rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}
            >
              Login Via OTP
            </Button>
          </Box>

          {/* Sign Up Link */}
          {/* <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                component={NextLink}
                sx={{
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Register Here
              </Link>
            </Typography>
          </Box> */}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
