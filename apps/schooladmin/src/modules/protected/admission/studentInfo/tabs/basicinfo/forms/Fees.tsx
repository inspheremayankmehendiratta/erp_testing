'use client';

import React from 'react';
import {
  Grid,

} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CustomInput } from '@/modules/shared/components/forms';


// --------------------
// Validation Schema
// --------------------
const validationSchema = Yup.object({
  address: Yup.string()
    .required('Sibling Admission No. is required')
    .min(3, 'Admission No. must be at least 3 characters'),
});

// --------------------
// Initial Values
// --------------------
const initialValues = {
  address: '',
};

const Fee = ({ value, onChange }: any) => {
  return (
    <Formik
      initialValues={value || initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
      enableReinitialize
      onSubmit={() => { }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
      }) => {

        React.useEffect(() => {
          onChange(values, isValid);
        }, [values, isValid]);

        return (
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 9 }}>
                <CustomInput
                  id="address"
                  name="address"
                  label="Sibling Admission No."
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={!!touched.address}
                  error={touched.address ? (errors.address as string) : undefined}
                  required
                  placeholder="Enter Admission No."
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Fee;
