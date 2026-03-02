'use client';
import {CustomInput } from '@/modules/shared/components/forms';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


interface Props {
  innerRef: any;
  onChange: (values: any) => void;
}

const validationSchema = Yup.object({
  passwordPolicy: Yup.string().required('Password policy is required'),
  sessionTimeout: Yup.number()
    .min(5, 'Minimum 5 minutes')
    .required('Session timeout is required'),
  maxLoginAttempts: Yup.number()
    .min(3, 'Minimum 3 attempts')
    .required('Max login attempts is required'),
});

const Security = ({ innerRef, onChange }: Props) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        passwordPolicy: 'strong',
        sessionTimeout: 30,
        maxLoginAttempts: 5,
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
              id="passwordPolicy"
              name="passwordPolicy"
              label="Password Policy"
              value={values.passwordPolicy}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.passwordPolicy}
              touched={touched.passwordPolicy}
              placeholder="strong / medium"
              required
            />

            <CustomInput
              id="sessionTimeout"
              name="sessionTimeout"
              label="Session Timeout (minutes)"
              type="number"
              value={values.sessionTimeout}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.sessionTimeout}
              touched={touched.sessionTimeout}
              placeholder="Enter session timeout"
              required
            />

            <CustomInput
              id="maxLoginAttempts"
              name="maxLoginAttempts"
              label="Max Login Attempts"
              type="number"
              value={values.maxLoginAttempts}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.maxLoginAttempts}
              touched={touched.maxLoginAttempts}
              placeholder="Enter max login attempts"
              required
            />

          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Security;
