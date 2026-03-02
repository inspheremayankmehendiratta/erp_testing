'use client';

import React from 'react';
import {
  Button,
  Grid,

} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {CustomInput,CustomSelect } from '@/modules/shared/components/forms';



const stateOptions = [
  { label: 'Select State', value: '', disabled: true },
  { label: 'Andaman and Nicobar Islands', value: 'andaman-and-nicobar-islands' },
  { label: 'Andhra Pradesh', value: 'andhra-pradesh' },
  { label: 'Arunachal Pradesh', value: 'arunachal-pradesh' },
  { label: 'Assam', value: 'assam' },
  { label: 'Bihar', value: 'bihar' },
  { label: 'Chandigarh', value: 'chandigarh' },
  { label: 'Chhattisgarh', value: 'chhattisgarh' },
  { label: 'Dadra Nagar Haveli', value: 'dadra-nagar-haveli' },
  { label: 'Daman and Diu', value: 'daman-and-diu' },
  { label: 'Delhi', value: 'delhi' },
  { label: 'Goa', value: 'goa' },
  { label: 'Gujarat', value: 'gujarat' },
  { label: 'Haryana', value: 'haryana' },
  { label: 'Himachal Pradesh', value: 'himachal-pradesh' },
  { label: 'Jammu and Kashmir', value: 'jammu-and-kashmir' },
  { label: 'Jharkhand', value: 'jharkhand' },
  { label: 'Karnataka', value: 'karnataka' },
  { label: 'Kerala', value: 'kerala' },
  { label: 'Lakshadweep', value: 'lakshadweep' },
  { label: 'Madhya Pradesh', value: 'madhya-pradesh' },
  { label: 'Maharashtra', value: 'maharashtra' },
  { label: 'Manipur', value: 'manipur' },
  { label: 'Meghalaya', value: 'meghalaya' },
  { label: 'Mizoram', value: 'mizoram' },
  { label: 'Nagaland', value: 'nagaland' },
  { label: 'Odisha', value: 'odisha' },
  { label: 'Puducherry', value: 'puducherry' },
  { label: 'Punjab', value: 'punjab' },
  { label: 'Rajasthan', value: 'rajasthan' },
  { label: 'Sikkim', value: 'sikkim' },
  { label: 'Tamil Nadu', value: 'tamil-nadu' },
  { label: 'Telangana', value: 'telangana' },
  { label: 'Tripura', value: 'tripura' },
  { label: 'Uttar Pradesh', value: 'uttar-pradesh' },
  { label: 'Uttarakhand', value: 'uttarakhand' },
  { label: 'West Bengal', value: 'west-bengal' }
];



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
  fullName: '',
  email: '',
  role: '',
  group: '',
  wing: '',
  skills: [],
  dob: '',
  gender: '',
  status: '',
  features: [] as number[],
  description: '',
  joiningClassSection: '',
  house: '',
  joiningStatus: '',
  mobileNumber: '',
  fatherName: '',
  apaarNumber: '',
  motherName: '',
  admission: '',
  exadmission: '',
  permanentEducationNo: '',
  address: '',
  area: '',
  city: '',
  pincode: '',
  leavingDate: '',
};

const Admission = () => {
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
            <Grid size={{ xs: 12, sm: 6, }}>
              <CustomInput
                id="address"
                name="address"
                label="Address Plot no"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.address}
                error={errors.address}
                placeholder="Enter plot no here"
              />
            </Grid>

            {/* area */}
            <Grid size={{ xs: 12, sm: 6, }}>
              <CustomInput
                id="area"
                name="area"
                label="Area"
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.area}
                error={errors.area}
                placeholder="Enter area here"
              />
            </Grid>
            {/* City */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <CustomInput
                id="city"
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.city}
                error={errors.city}
                placeholder="Enter city here"
              />
            </Grid>
            {/* Pincode */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <CustomInput
                id="pincode"
                name="pincode"
                label="Pincode"
                value={values.pincode}
                onChange={(e) => {
                  // Remove non-digit characters and limit length to 6
                  const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setFieldValue('pincode', onlyNums);
                }}
                onBlur={handleBlur}
                touched={touched.pincode}
                error={errors.pincode}
                required
                placeholder="Enter 6-digit pincode"
                type="text"
              />
            </Grid>
            {/* Mobile number */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <CustomInput
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                value={values.mobileNumber}
                onChange={(e) => {
                  // Remove non-digit characters and limit length to 10
                  const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFieldValue('mobileNumber', onlyNums);
                }}
                onBlur={handleBlur}
                touched={touched.mobileNumber}
                error={errors.mobileNumber}
                required
                placeholder="mobile number"
                type="text"
              />
            </Grid>



            {/* Role */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <CustomSelect
                id="role"
                name="role"
                label="State"
                value={values.role}
                options={stateOptions}
                placeholder="Select State"
                required
                touched={touched.role}
                error={errors.role}
                onChange={(e) =>
                  setFieldValue('role', e.target.value)
                }
              />
            </Grid>
            {/* Emergency number */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <CustomInput
                id="mobileNumber"
                name="mobileNumber"
                label="Emergency Number"
                value={values.mobileNumber}
                onChange={(e) => {
                  // Remove non-digit characters and limit length to 10
                  const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFieldValue('mobileNumber', onlyNums);
                }}
                onBlur={handleBlur}
                touched={touched.mobileNumber}
                error={errors.mobileNumber}
                required
                placeholder="Emergency number"
                type="text"
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
                error={errors.email}
                required
                placeholder="Enter email"
              />
            </Grid>





          </Grid>
        </Form>
      )
      }
    </Formik >
  );
};

export default Admission;
