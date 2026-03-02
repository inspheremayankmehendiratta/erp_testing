
'use client';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
  Tooltip,
} from '@mui/material';
import { RegisterFormValues } from '../types';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomInput } from '@/modules/shared/components/forms';


const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters'),
    // .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
});

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  initialValues?: Partial<RegisterFormValues>;
  error?: string | null;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  },
  error = null,
  isLoading = false,
}) => {
  const [submitError, setSubmitError] = useState<string | null>(error);

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      setSubmitError(null);
      await onSubmit(values);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong';
      setSubmitError(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={initialValues as RegisterFormValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
        <Form style={{ width: "100%" }} noValidate>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="First Name"
                required
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.firstName}
                error={errors.firstName}
                startAdornment={<PersonOutlineIcon fontSize="small" />}
                disabled={isLoading || isSubmitting}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.lastName}
                error={errors.lastName}
                startAdornment={<PersonOutlineIcon fontSize="small" />}
                disabled={isLoading || isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <CustomInput
                id="email"
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your Email"
                required
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.email}
                error={errors.email}
                startAdornment={<EmailOutlinedIcon fontSize="small" />}
                endAdornment={
                  <Tooltip title="We will send a verification link to this email" placement="top" arrow>
                    <InfoOutlinedIcon fontSize="small" style={{ cursor: "pointer" }} />
                  </Tooltip>
                }
                disabled={isLoading || isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <CustomInput
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Create a password"
                required
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.password}
                error={errors.password}
                enablePasswordToggle
                startAdornment={<LockOutlinedIcon fontSize="small" />}
                disabled={isLoading || isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <CustomInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                required
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.confirmPassword}
                error={errors.confirmPassword}
                enablePasswordToggle
                startAdornment={<LockOutlinedIcon fontSize="small" />}
                disabled={isLoading || isSubmitting}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 1, mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  color="primary"
                  checked={values.agreeToTerms}
                  onChange={handleChange}
                  disabled={isLoading || isSubmitting}
                />
              }
              label={
                <Typography sx={{ fontSize: '13px', color: '#666' }}>
                  I agree to the{' '}
                  <Link href="/terms" sx={{ color: '#1976d2', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Terms and Conditions
                  </Link>
                </Typography>
              }
            />
            {touched.agreeToTerms && errors.agreeToTerms && (
              <Typography sx={{ fontSize: '12px', color: '#d32f2f', ml: 3.5 }}>
                {errors.agreeToTerms}
              </Typography>
            )}
          </Box>

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
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '6px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              '&:disabled': { backgroundColor: '#ccc', color: '#999' },
            }}
          >
            {isLoading || isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Account'
            )}
          </Button>

          {/* Sign In Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: '14px', color: '#666' }}>
              Already have an account?{' '}
              <Link
                href="/"
                sx={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;