'use client';

import {CustomInput } from '@/modules/shared/components/forms';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


interface Props {
  innerRef: any;
  onChange: (values: any) => void;
}

const validationSchema = Yup.object({
  adminName: Yup.string().required('Admin name is required'),

  adminEmail: Yup.string()
    .email('Enter valid email')
    .required('Admin email is required'),

  adminMobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter valid 10 digit mobile number')
    .required('Admin mobile number is required'),

  username: Yup.string()
    .min(4, 'Minimum 4 characters')
    .required('Username is required'),

  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const AdminUser = ({ innerRef, onChange }: Props) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        adminName: '',
        adminEmail: '',
        adminMobile: '',
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { confirmPassword, ...payload } = values;
        onChange(payload);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
      }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <CustomInput
              id="adminName"
              name="adminName"
              label="Admin Name"
              value={values.adminName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.adminName}
              touched={touched.adminName}
              placeholder="Enter admin name"
              required
            />

            <CustomInput
              id="adminEmail"
              name="adminEmail"
              label="Admin Email"
              value={values.adminEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.adminEmail}
              touched={touched.adminEmail}
              placeholder="Enter admin email"
              required
            />

            <CustomInput
              id="adminMobile"
              name="adminMobile"
              label="Admin Mobile Number"
              value={values.adminMobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.adminMobile}
              touched={touched.adminMobile}
              placeholder="Enter admin mobile number"
              required
            />

            <CustomInput
              id="username"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
              touched={touched.username}
              placeholder="Enter username"
              required
            />

            <CustomInput
              id="password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              placeholder="Enter password"
              required
            />

            <CustomInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              placeholder="Confirm password"
              required
            />

          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdminUser;
