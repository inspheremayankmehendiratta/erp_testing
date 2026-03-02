'use client';

import {
  Grid,

} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomDatePicker, CustomInput, CustomMultiSelect, CustomSelect } from '@/modules/shared/components/forms';
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
  { label: 'Select Group', value: '' },
  { label: 'Ist to X (Commerce) (COMMERCE)', value: 'Ist to X (Commerce)' },
  { label: 'Pre Primary - UKG (COMMON)', value: 'Pre Primary - UKG' },
  { label: 'XI to XII (Arts) (Arts)', value: 'XI to XII (Arts)' },
  { label: 'XI to XII (Commerce) (COMMERCE)', value: 'XI to XII (Commerce)' },
  { label: 'XI to XII (Science) (SCIENCE)', value: 'XI to XII (Science)' },
  { label: 'Ist to X (COMMON)', value: 'Ist to X' },
];
const wingOptions = [
  { label: 'Junior', value: 'junior' },
  { label: 'Middle', value: 'middle' },
  { label: 'Senior', value: 'senior' },
];
const houseOptions = [
  { label: 'House', value: 'house' },
  { label: 'Ganga', value: 'ganga' },
  { label: 'Ravi', value: 'ravi' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
];
const statusOptions = [
  { label: 'Select Status', value: '' },
  { label: 'Studying', value: 'studying' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Left', value: 'left' },
  { label: 'stuck off', value: 'stuck-off', disabled: true },
  { label: 'Withdrawn', value: 'withdrawn', disabled: true },
];
const featureOptions = [
  { label: 'Homework', value: 1 },
  { label: 'Assignment', value: 2 },
  { label: 'Attendance', value: 3 },
];
const joiningStatusOptions = [
  { label: 'Select Joining Status', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Old', value: 'old' },
];

// --------------------
// Validation Schema
// --------------------
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
    .max(20, 'Maximum 20 characters allowed'),

  admission: Yup.string().required('Admission number is required'),

  exadmission: Yup.string().required('Ex Admission number is required'),

  permanentEducationNo: Yup.string().required(
    'Permanent Education No. is required'
  ),

  role: Yup.string().required('Class Section is required'),

  group: Yup.string().required('Group is required'),

  wing: Yup.string().required('Wing is required'),

  dob: Yup.date()
    .required('Date of Birth is required')
    .max(
      new Date(new Date().setMonth(new Date().getMonth() - 3)),
      'Child must be at least 3 months old'
    )
    .typeError('Invalid date'),

  status: Yup.string().required('Status is required'),

  gender: Yup.string().required('Gender is required'),

  skills: Yup.array()
    .min(1, 'Select at least one skill')
    .required('Skills are required'),

  joiningDate: Yup.string().required('Joining Date is required'),

  leavingDate: Yup.string().required('Leaving Date is required'),

  joiningClassSection: Yup.string().required(
    'Joining Class Section is required'
  ),

  house: Yup.string().required('House is required'),

  joiningStatus: Yup.string().required('Joining Status is required'),

  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile Number is required'),

  fatherName: Yup.string()
    .required('Father name is required')
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
    .max(20, 'Maximum 20 characters allowed'),

  apaarNumber: Yup.string().required('Apaar Number is required'),

  motherName: Yup.string()
    .required('Mother name is required')
    .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed')
    .max(20, 'Maximum 20 characters allowed'),
});

// --------------------
// Initial Values
// --------------------
const initialValues = {
  fullName: '',
  admission: '',
  exadmission: '',
  permanentEducationNo: '',
  role: '',
  group: '',
  wing: '',
  dob: '',
  status: '',
  gender: '',
  skills: [] as number[],
  joiningDate: '',
  leavingDate: '',
  joiningClassSection: '',
  house: '',
  joiningStatus: '',
  mobileNumber: '',
  fatherName: '',
  apaarNumber: '',
  motherName: '',
};

const AcademicCMS = ({ value, onChange }: any) => {
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
        // 🔥 Notify parent whenever values or validity changes
        useEffect(() => {
          onChange(values, isValid);
        }, [values, isValid]);
        return (
          <Form noValidate>
            <Grid container spacing={2}>

              {/* Full Name */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.fullName}
                  error={errors.fullName}
                  required
                  placeholder="Enter full name"
                />
              </Grid>
              {/* Admission no */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="admission"
                  name="admission"
                  label="Admission No."
                  value={values.admission}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.admission}
                  placeholder="Admission number"
                  error={errors.admission}
                  required
                />
              </Grid>
              {/* Admission no */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="exadmission"
                  name="exadmission"
                  label="Ex Admission No."
                  value={values.exadmission}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.exadmission}
                  placeholder="Ex Admission number"
                  required
                  error={errors.exadmission}
                />
              </Grid>
              {/* Admission no */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="permanentEducationNo"
                  name="permanentEducationNo"
                  label="Permanent Education No."
                  value={values.permanentEducationNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.permanentEducationNo}
                  required
                  placeholder="Permanent Education No."
                  error={errors.permanentEducationNo}
                />
              </Grid>



              {/* Role */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="role"
                  name="role"
                  label="Class Section"
                  value={values.role}
                  options={roleOptions}
                  placeholder="Class Section"
                  required
                  touched={touched.role}
                  error={errors.role}
                  onChange={(e) =>
                    setFieldValue('role', e.target.value)
                  }
                />
              </Grid>
              {/* Group */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="group"
                  name="group"
                  label="Group"
                  value={values.group}
                  options={groupOptions}
                  placeholder="Select Group"
                  touched={touched.group}
                  error={errors.group}
                  onChange={(e) =>
                    setFieldValue('group', e.target.value)
                  }
                  required
                />
              </Grid>
              {/* wing */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="wing"
                  name="wing"
                  label="Wing"
                  value={values.wing}
                  options={wingOptions}
                  placeholder="Select Wing"
                  touched={touched.wing}
                  error={errors.wing}
                  onChange={(e) =>
                    setFieldValue('wing', e.target.value)
                  }
                  required
                />
              </Grid>


              {/* DOB */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomDatePicker
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  required
                />
              </Grid>

              {/* status */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="status"
                  name="status"
                  label="Status"
                  value={values.status}
                  options={statusOptions}
                  placeholder="Select Status"
                  touched={touched.status}
                  error={errors.status}
                  onChange={(e) =>
                    setFieldValue('status', e.target.value)
                  }
                  required
                />
              </Grid>

              {/* gender */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="gender"
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  options={genderOptions}
                  placeholder="Select Gender"
                  touched={touched.gender}
                  error={errors.gender}
                  onChange={(e) =>
                    setFieldValue('gender', e.target.value)
                  }
                  required
                />
              </Grid>

              {/* Skills */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomMultiSelect
                  id="skills"
                  name="skills"
                  label="Skills"
                  value={values.skills}
                  options={[
                    { label: 'Select All', value: '' },
                    { label: 'Record Pending', value: 0 },
                    { label: 'Migration', value: 1 },
                    { label: 'Birth Certificate', value: 2 },
                    { label: 'Xth Certificate', value: 3 },
                    { label: 'XIIth Certificate', value: 4 },
                    { label: 'Aadhaar Card', value: 5 },
                  ]}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFieldValue(
                      "skills",
                      typeof value === "string" ? value.split(",") : value
                    );
                  }}
                  error={errors.skills as string}
                  required
                  touched={touched.skills}
                />
              </Grid>

              {/* DOB */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomDatePicker
                  id="joiningDate"
                  name="joiningDate"
                  label="Joining Date"
                />
              </Grid>
              {/* DOB */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomDatePicker
                  id="LeavingDate"
                  name="leavingDate"
                  label="Leaving Date"

                />
              </Grid>

              {/* Class section */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="joiningClassSection"
                  name="joiningClassSection"
                  label="Joining Class Section"
                  value={values.joiningClassSection}
                  options={classSectionOptions}
                  placeholder="Select Class Section"
                  touched={touched.joiningClassSection}
                  error={errors.joiningClassSection as string}
                  onChange={(e) =>
                    setFieldValue('joiningClassSection', e.target.value)
                  }
                />
              </Grid>
              {/* House */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="house"
                  name="house"
                  label="House"
                  value={values.house}
                  options={houseOptions}
                  placeholder="Select House"
                  touched={touched.house}
                  error={errors.house as string}
                  onChange={(e) =>
                    setFieldValue('house', e.target.value)
                  }
                />
              </Grid>
              {/* Joing status */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomSelect
                  id="joiningStatus"
                  name="joiningStatus"
                  label="Joining Status"
                  value={values.joiningStatus}
                  options={joiningStatusOptions}
                  placeholder="Select Joining Status"
                  touched={touched.joiningStatus}
                  error={errors.joiningStatus as string}
                  onChange={(e) =>
                    setFieldValue('joiningStatus', e.target.value)
                  }
                />
              </Grid>
              {/* Mobile number */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
              {/* father Name */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="fatherName"
                  name="fatherName"
                  label="Father's Name"
                  value={values.fatherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.fatherName}
                  placeholder="Father's Name"
                  error={errors.fatherName}
                  required
                />
              </Grid>
              {/* apaar num */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="apaarNumber"
                  name="apaarNumber"
                  label="Apaar Number"
                  value={values.apaarNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.apaarNumber}
                  placeholder="Apaar Number"
                  error={errors.apaarNumber}
                  required
                />
              </Grid>
              {/* Mother Name */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CustomInput
                  id="motherName"
                  name="motherName"
                  label="Mother's Name"
                  value={values.motherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.motherName}
                  placeholder="Mother's Name"
                  error={errors.motherName}
                  required
                />
              </Grid>



            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AcademicCMS;
