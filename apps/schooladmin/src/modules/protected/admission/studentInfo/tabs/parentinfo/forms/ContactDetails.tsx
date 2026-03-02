'use client';

import {CustomInput } from '@/modules/shared/components/forms';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


interface Props {
  innerRef: any;
  onChange: (values: any) => void;
}

const validationSchema = Yup.object({
  primaryEmail: Yup.string()
    .email('Enter valid email')
    .required('Primary email is required'),

  primaryMobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter valid 10 digit mobile number')
    .required('Primary mobile number is required'),

  secondaryEmail: Yup.string()
    .email('Enter valid email')
    .nullable(),

  secondaryMobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter valid 10 digit mobile number')
    .nullable(),
});

const ContactDetails = ({ innerRef, onChange }: Props) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        primaryEmail: '',
        primaryMobile: '',
        secondaryEmail: '',
        secondaryMobile: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onChange(values);
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
              id="primaryEmail"
              name="primaryEmail"
              label="Primary Email"
              value={values.primaryEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.primaryEmail}
              touched={touched.primaryEmail}
              placeholder="Enter primary email"
              required
            />

            <CustomInput
              id="primaryMobile"
              name="primaryMobile"
              label="Primary Mobile Number"
              value={values.primaryMobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.primaryMobile}
              touched={touched.primaryMobile}
              placeholder="Enter primary mobile number"
              required
            />

            <CustomInput
              id="secondaryEmail"
              name="secondaryEmail"
              label="Secondary Email"
              value={values.secondaryEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.secondaryEmail}
              touched={touched.secondaryEmail}
              placeholder="Enter secondary email"
            />

            <CustomInput
              id="secondaryMobile"
              name="secondaryMobile"
              label="Secondary Mobile Number"
              value={values.secondaryMobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.secondaryMobile}
              touched={touched.secondaryMobile}
              placeholder="Enter secondary mobile number"
            />

          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactDetails;
