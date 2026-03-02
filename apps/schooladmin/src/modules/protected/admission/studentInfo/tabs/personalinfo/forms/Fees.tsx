'use client';

import React from 'react';
import {
  Grid,

} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {CustomInput } from '@/modules/shared/components/forms';


// --------------------
// Validation Schema
// --------------------
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().required('Role is required'),
  group: Yup.string().required('Group is required'),
  wing: Yup.string().required('Wing is required'),
  skills: Yup.array().min(1, 'Select at least one skill'),
  dob: Yup.string().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  status: Yup.string().required('Status is required'),
  features: Yup.array().min(1, 'Select at least one feature'),
  description: Yup.string().required('Description is required'),
});

// --------------------
// Initial Values
// --------------------
const initialValues = {

  address: '',
};

const Fee = ({value,onChange}:any) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form Values 👉', values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form noValidate>
          <Grid container spacing={2}>

            {/* address*/}
            <Grid size={{ xs: 12, sm: 9, }}>
              <CustomInput
                id="address"
                name="address"
                label="Sibiling Admission No."
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.address}
                error={errors.address}
                placeholder="Enter Admission No."
              />
            </Grid>
          </Grid>
        </Form>
      )
      }
    </Formik >
  );
};

export default Fee;
