'use client';

import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Grid,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';

import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';


import OtpValid from './OtpValid';
import { CustomInput } from '@/modules/shared/components/forms';
import { Captcha } from '@/modules/shared/components/forms/GenerateCaptcha';




interface LoginViaOTPProps {
  isLoading?: boolean;
  setShowOtpScreen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object({
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter valid 10 digit mobile number'),
  captcha: Yup.string().required('Captcha is required'),
});

const LoginViaOTP: React.FC<LoginViaOTPProps> = ({
  isLoading = false,
  setShowOtpScreen
}) => {

  const captchaRef = useRef<{ reload: () => void }>(null);
  const [actualCaptcha, setActualCaptcha] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
   const [showInputOTP, setShowInputOTP] = useState(false);

  const HandleOtpSent =()=>{
setShowInputOTP(true)
  }



return (
  <>
    {showInputOTP ? (
      <OtpValid  msg={'We will send you a One-Time password on this mobile number'} setShowOtpScreen={setShowOtpScreen}/>
    ) : (
      <Formik
        initialValues={{ mobile: '', captcha: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitError(null);

          if (values.captcha !== actualCaptcha) {
            setSubmitError('Captcha validation failed');
            captchaRef.current?.reload();
            setSubmitting(false);
            return;
          }

          try {
            await HandleOtpSent();
            resetForm();
          } catch (err: any) {
            setSubmitError(err?.message || 'Something went wrong');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form noValidate>
            <Typography sx={{ mb: 2, fontSize: 14, color: '#666', textAlign: 'center' }}>
              We will send a One-Time Password to your registered mobile number
            </Typography>

            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

         <Grid container spacing={1}>
  {/* Mobile Number */}
  <Grid size={12}>
    <CustomInput
      id="mobile"
      name="mobile"
      label="Mobile Number"
      required
      placeholder="Enter mobile number"
      value={values.mobile}
      onChange={handleChange}
      onBlur={handleBlur}
      touched={touched.mobile}
      error={errors.mobile}
      maxLength={10}
      startAdornment={<PhoneAndroidOutlinedIcon fontSize="small" />}
    />
  </Grid>

  {/* Captcha Row */}
  <Grid container spacing={2} alignItems="center">
    {/* Captcha Image */}
    <Grid size={{ xs: 12, sm: 4 }}>
      <Captcha
        numberOfCharacters={6}
        backgroundColor="white"
        fontColor="black"
        onChange={setActualCaptcha}
        ref={captchaRef}
      />
    </Grid>

    {/* Captcha Input */}
    <Grid size={{ xs: 12, sm: 8 }}>
      <CustomInput
        id="captcha"
        name="captcha"
        label="Captcha"
        required
        placeholder="Enter captcha"
        value={values.captcha}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.captcha}
        error={errors.captcha}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => captchaRef.current?.reload()}
              edge="end"
              aria-label="Reload captcha"
            >
              <RefreshOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </Grid>
  </Grid>
</Grid>


            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={isSubmitting || isLoading}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              {isSubmitting || isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send OTP'
              )}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => setShowOtpScreen?.(false)}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Login via Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    )}
  </>
);

};

export default LoginViaOTP;
