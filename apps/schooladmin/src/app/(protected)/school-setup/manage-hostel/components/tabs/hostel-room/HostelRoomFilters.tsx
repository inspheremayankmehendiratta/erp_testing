'use client';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomInput } from '@/modules/shared/components/forms';
import { HostelFilters } from './Hostel.types';


interface FiltersProps {
  filterValues: HostelFilters;
  onApply: (values: HostelFilters) => void;
}
//used to reset the filters to default values when reset button is clicked
const defaultValues: HostelFilters = {
  first_name: '',
  email: '',
  mobile: '',
  role: '',
  status: '',
};

const CustomFilters = ({ filterValues, onApply }: FiltersProps) => {
  const initialValues: HostelFilters = filterValues;

  return (
    <Box sx={{ p: 2 }}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => {
          onApply(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid size={{xs:6}}>
                <CustomInput
                  id="first_name"
                  name="first_name"
                  label="Machine Code"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.first_name}
                  error={errors.first_name}
                />
              </Grid>

              <Grid size={{xs:6}}>
                <CustomInput
                  id="email"
                  name="email"
                  label="Modal"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.email}
                  error={errors.email}
                />
              </Grid>

              <Grid size={{xs:6}}>
                <CustomInput
                  id="mobile"
                  name="mobile"
                  label="Location"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.mobile}
                  error={errors.mobile}
                />
              </Grid>

              <Grid size={{xs:6}}>
                <CustomInput
                  id="role"
                  name="role"
                  label="IP Address"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.role}
                  error={errors.role}
                />
              </Grid>

              <Grid size={{xs:12}}>
                <CustomInput
                  id="status"
                  name="status"
                  label="Status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.status}
                  error={errors.status}
                />
              </Grid>

              <Grid size={{xs:12}}>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<RotateCcw size={18} />}
                    onClick={() => {
                      resetForm({ values: defaultValues });
                      onApply(defaultValues);
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Filter size={18} />}
                  >
                    Apply
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CustomFilters;
