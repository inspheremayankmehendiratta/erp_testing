'use client';

import {

  Grid,

} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CustomSelect } from '@/modules/shared/components/forms';
import { useEffect } from 'react';

// --------------------
// Options
// --------------------

const groupOptions = [
  { label: 'Parent Details', value: '' },
  { label: 'Father-Mother (Both)', value: 'Father-Mother (Both)' },
  { label: 'Single Father', value: 'Single Father' },
  { label: 'Single Mother', value: 'Single Mother' },
  { label: 'Guardian', value: 'Guardian' },

];


// --------------------
// Validation Schema
// --------------------
const validationSchema = Yup.object({
  group: Yup.string().required('Parent type is required'),
});

// --------------------
// Initial Values
// --------------------
const initialValues = {
  group: '',
};


const SchoolBasicInfos = ({ onSectionChange }: any) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
      onSubmit={() => {}}
    >
      {({ values, errors, touched, setFieldValue, isValid }) => {

        useEffect(() => {
          onSectionChange(values, isValid);
        }, [values, isValid]);

        return (
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomSelect
                  id="group"
                  name="group"
                  label="Parent Details"
                  value={values.group}
                  options={groupOptions}
                  placeholder="Parent Details"
                  required
                  touched={!!touched.group}
                  error={
                    touched.group ? (errors.group as string) : undefined
                  }
                  onChange={(e) =>
                    setFieldValue('group', e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SchoolBasicInfos;
