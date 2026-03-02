'use client';


import {CustomInput} from '@/modules/shared/components/forms';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';


interface Props {
  innerRef: any;
  onChange: (values: any) => void;
}

const validationSchema = Yup.object({
  addressLine1: Yup.string().required('Address Line 1 is required'),
  addressLine2: Yup.string().nullable(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Enter valid 6 digit pincode')
    .required('Pincode is required'),
  country: Yup.string().required('Country is required'),
});

const Address = ({ innerRef, onChange }: Props) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
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
              id="addressLine1"
              name="addressLine1"
              label="Address Line 1"
              value={values.addressLine1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.addressLine1}
              touched={touched.addressLine1}
              placeholder="Enter address line 1"
              required
            />

            <CustomInput
              id="addressLine2"
              name="addressLine2"
              label="Address Line 2"
              value={values.addressLine2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.addressLine2}
              touched={touched.addressLine2}
              placeholder="Enter address line 2"
            />

            <CustomInput
              id="city"
              name="city"
              label="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.city}
              touched={touched.city}
              placeholder="Enter city"
              required
            />

            <CustomInput
              id="state"
              name="state"
              label="State"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.state}
              touched={touched.state}
              placeholder="Enter state"
              required
            />

            <CustomInput
              id="pincode"
              name="pincode"
              label="Pincode"
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.pincode}
              touched={touched.pincode}
              placeholder="Enter pincode"
              required
            />

            <CustomInput
              id="country"
              name="country"
              label="Country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.country}
              touched={touched.country}
              placeholder="Enter country"
              required
            />

          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Address;
