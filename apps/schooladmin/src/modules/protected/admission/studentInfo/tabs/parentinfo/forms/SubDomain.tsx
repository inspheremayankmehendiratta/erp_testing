'use client';

import {
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CustomInput, CustomSelect } from '@/modules/shared/components/forms';
import { useEffect } from 'react';

// --------------------
// Options
// --------------------
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const roleOptions = [
  { label: 'Select Class-Section', value: '' },
  { label: 'PRE PRIMARY-A', value: 'pre-primary-a' },
  { label: 'PRE PRIMARY-B', value: 'pre-primary-b' },
  { label: 'PRE PRIMARY-C', value: 'pre-primary-c' },
  { label: 'PRE PRIMARY-D', value: 'pre-primary-d' },
  { label: 'PRE PRIMARY-E', value: 'pre-primary-e' },
  { label: 'I-B', value: 'i-b' },
  { label: 'I-C', value: 'i-c' },
  { label: 'I-D', value: 'i-d' },
  { label: 'I-aa', value: 'i-aa' },
  { label: 'II-A', value: 'ii-a' },
  { label: 'II-B', value: 'ii-b' },
  { label: 'II-C', value: 'ii-c' },
  { label: 'II-D', value: 'ii-d' },
  { label: 'III-A', value: 'iii-a' },
  { label: 'III-B', value: 'iii-b' },
  { label: 'III-C', value: 'iii-c' },
  { label: 'III-D', value: 'iii-d' },
  { label: 'IV-A', value: 'iv-a' },
  { label: 'IV-B', value: 'iv-b' },
  { label: 'IV-C', value: 'iv-c' },
  { label: 'IV-D', value: 'iv-d' },
  { label: 'V-A', value: 'v-a' },
  { label: 'V-B', value: 'v-b' },
  { label: 'V-C', value: 'v-c' },
  { label: 'V-D', value: 'v-d' },
  { label: 'VI-A', value: 'vi-a' },
  { label: 'VI-B', value: 'vi-b' },
  { label: 'VI-C', value: 'vi-c' },
  { label: 'VI-D', value: 'vi-d' },
  { label: 'VI-E', value: 'vi-e' },
  { label: 'VII-A', value: 'vii-a' },
  { label: 'VII-B', value: 'vii-b' },
  { label: 'VII-C', value: 'vii-c' },
  { label: 'VII-D', value: 'vii-d' },
  { label: 'VIII-A', value: 'viii-a' },
  { label: 'VIII-B', value: 'viii-b' },
  { label: 'VIII-C', value: 'viii-c' },
  { label: 'VIII-D', value: 'viii-d' },
  { label: 'IX-A', value: 'ix-a' },
  { label: 'IX-B', value: 'ix-b' },
  { label: 'IX-C', value: 'ix-c' },
  { label: 'IX-D', value: 'ix-d' },
  { label: 'X-A', value: 'x-a' },
  { label: 'X-B', value: 'x-b' },
  { label: 'X-C', value: 'x-c' },
  { label: 'X-D', value: 'x-d' },
  { label: 'XI-A', value: 'xi-a' },
  { label: 'XI-B', value: 'xi-b' },
  { label: 'XI-C', value: 'xi-c' }
];

const classSectionOptions = [
  { label: 'Joing class-Section', value: 'Joing class-Section' },
]
const groupOptions = [
  { label: 'Relation with guardian', value: '' },
  { label: 'Uncle', value: 'uncle' },
  { label: 'Aunt', value: 'aunt' },
  { label: 'Sister', value: 'sister' },

];
const wingOptions = [
  { label: 'Guardian Occupation', value: 'guardian-occupation' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Engineer', value: 'engineer' },
  { label: 'Nurse', value: 'nurse' },
  { label: 'Librarian', value: 'librarian' },
  { label: 'Architect', value: 'architect' },
];


// --------------------
// Validation Schema
// --------------------
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Guardian name is required')
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
    .max(20, 'Maximum 20 characters allowed'),

  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  group: Yup.string().required('Relation is required'),

  wing: Yup.string().required('Occupation is required'),

  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, 'Enter valid 10 digit number')
    .required('Mobile number is required'),

  guardianaddress: Yup.string().required('Address is required'),
});

// --------------------
// Initial Values
// --------------------
const initialValues = {
  fullName: '',
  email: '',
  group: '',
  wing: '',
  mobileNumber: '',
  guardianaddress: '',
};

const SubDomain = ({ onSectionChange }: any) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
      onSubmit={() => { }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid,
      }) => {

        useEffect(() => {
          onSectionChange(values, isValid);
        }, [values, isValid]);

        return (
          <Form noValidate>
            <Grid container spacing={2}>

              {/* Guardian Name */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="fullName"
                  name="fullName"
                  label="Guardian Name"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.fullName}
                  error={touched.fullName ? errors.fullName : undefined}
                  required
                  placeholder="Enter guardian name"
                />
              </Grid>

              {/* Relation */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="group"
                  name="group"
                  label="Relation with Guardian"
                  value={values.group}
                  options={groupOptions}
                  placeholder="Relation with guardian"
                  touched={touched.group}
                  error={touched.group ? errors.group : undefined}
                  required
                  onChange={(e) =>
                    setFieldValue('group', e.target.value)
                  }
                />
              </Grid>

              {/* Occupation */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="wing"
                  name="wing"
                  label="Guardian's Occupation"
                  value={values.wing}
                  options={wingOptions}
                  placeholder="Select Occupation"
                  touched={touched.wing}
                  error={touched.wing ? errors.wing : undefined}
                  required
                  onChange={(e) =>
                    setFieldValue('wing', e.target.value)
                  }
                />
              </Grid>

              {/* Mobile Number */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="mobileNumber"
                  name="mobileNumber"
                  label="Guardian Mobile Number"
                  value={values.mobileNumber}
                  onChange={(e) => {
                    const onlyNums = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 10);
                    setFieldValue('mobileNumber', onlyNums);
                  }}
                  onBlur={handleBlur}
                  touched={touched.mobileNumber}
                  error={
                    touched.mobileNumber
                      ? errors.mobileNumber
                      : undefined
                  }
                  required
                  placeholder="Enter 10 digit mobile number"
                  type="text"
                />
              </Grid>

              {/* Address */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomInput
                  id="guardianaddress"
                  name="guardianaddress"
                  label="Guardian Address"
                  value={values.guardianaddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.guardianaddress}
                  error={
                    touched.guardianaddress
                      ? errors.guardianaddress
                      : undefined
                  }
                  required
                  placeholder="Enter guardian address"
                />
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomInput
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.email}
                  error={touched.email ? errors.email : undefined}
                  required
                  placeholder="Enter email"
                />
              </Grid>

            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SubDomain;
