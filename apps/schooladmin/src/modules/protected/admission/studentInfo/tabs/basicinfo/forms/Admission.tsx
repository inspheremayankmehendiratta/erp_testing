'use client';


import {

  Grid,

} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CustomInput, CustomSelect } from '@/modules/shared/components/forms';
import { useEffect } from 'react';



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
  address: Yup.string().required('Address is required'),
  area: Yup.string().required('Area is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string()
    .length(6, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  mobileNumber: Yup.string()
    .length(10, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  emergencyNumber: Yup.string()
    .length(10, 'Emergency number must be 10 digits')
    .required('Emergency number is required'),
  state: Yup.string().required('State is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

// --------------------
// Initial Values
// --------------------
const initialValues = {
  address: '',
  area: '',
  city: '',
  pincode: '',
  mobileNumber: '',
  emergencyNumber: '',
  state: '',
  email: '',
};

const Admission = ({ value, isValid, onChange }: any) => {
  return (
    <Formik
      initialValues={initialValues}
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
        setFieldValue,
        isValid
      }) => {

        useEffect(() => {
          onChange(values, isValid);
        }, [values, isValid]);

        return (
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
                  required
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
                  required
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
                  required
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
                  id="state"
                  name="state"
                  label="State"
                  value={values.state}
                  options={stateOptions}
                  placeholder="Select State"
                  required
                  touched={touched.state}
                  error={errors.state}
                  onChange={(e) =>
                    setFieldValue('state', e.target.value)
                  }
                />
              </Grid>
              {/* Emergency number */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CustomInput
                  id="emergencyNumber"
                  name="emergencyNumber"
                  label="Emergency Number"
                  value={values.emergencyNumber}
                  onChange={(e) => {
                    // Remove non-digit characters and limit length to 10
                    const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFieldValue('emergencyNumber', onlyNums);
                  }}
                  onBlur={handleBlur}
                  touched={touched.emergencyNumber}
                  error={errors.emergencyNumber}
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
        );
      }}
    </Formik >
  );
};

export default Admission;
