
'use client';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Grid,
  Button,
  Link,
  Typography,
  CircularProgress,
  Alert,
  Tooltip,
} from '@mui/material';
import NextLink from "next/link";
import { ForgotPasswordFormValues } from '../types';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomInput } from '@/modules/shared/components/forms';



const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => Promise<void>;
  initialValues?: Partial<ForgotPasswordFormValues>;
  error?: string | null;
  isLoading?: boolean;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  initialValues = {
    email: '',
  },
  error = null,
  isLoading = false,
}) => {
  const [submitError, setSubmitError] = useState<string | null>(error);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      setSubmitError(null);
      await onSubmit(values);
      setIsSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong';
      setSubmitError(errorMessage);
      setIsSuccess(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues as ForgotPasswordFormValues}
      validationSchema={forgotPasswordValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, values, handleChange, handleBlur }) => (
        <Form style={{ width: "100%" }} noValidate>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          
          {isSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Reset link sent! Please check your email inbox.
            </Alert>
          )}

          <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
            Enter the email address associated with your account and we&apos;ll send you a link to reset your password.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={12}>
              <CustomInput
                id="email"
                name="email"
                label="Email Address"
                required
                type="email"
                placeholder="Enter your email address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.email}
                error={errors.email}
                startAdornment={<EmailOutlinedIcon fontSize="small" />}
                endAdornment={
                  <Tooltip title="Provide your registered email" placement="top" arrow>
                    <InfoOutlinedIcon fontSize="small" style={{ cursor: "pointer" }} />
                  </Tooltip>
                }
                disabled={isLoading || isSubmitting}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading || isSubmitting || isSuccess}
            sx={{
              mt: 1,
              mb: 3,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '6px',
              '&:disabled': {
                backgroundColor: '#ccc',
                color: '#999',
              },
            }}
          >
            {isLoading || isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send Reset Link'
            )}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link
              href="/"
              component={NextLink}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: '16px', mr: 0.5 }} />
              Back to Sign In
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;