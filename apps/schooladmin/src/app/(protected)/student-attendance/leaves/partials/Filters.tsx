'use client';

import {
  Grid,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomSelect } from '@/modules/shared/components/forms';
import { ManageSchoolFilters } from '../leaves.types';
import { CustomInput } from '@/modules/shared/components/forms';

interface FiltersProps {
  filterValues: ManageSchoolFilters;
  onApply: (values: ManageSchoolFilters) => void;
}

const CustomFilters = ({ filterValues, onApply }: FiltersProps) => {
  const initialValues: ManageSchoolFilters = filterValues;

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
              <Grid size={{ xs: 6 }}>
                <CustomInput
                  id="first_name"
                  name="first_name"
                  label="Enter Name"
                  value={values.first_name || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.first_name}
                  error={errors.first_name}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomSelect
                  id="role"
                  name="role"
                  label="Select Role"
                  value={values.role || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.role}
                  error={errors.role}
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'teacher', label: 'Teacher' },
                  ]}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomSelect
                  id="status"
                  name="status"
                  label="Select Status"
                  value={values.status || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.status}
                  error={errors.status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'disabled', label: 'Disabled' },
                  ]}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<RotateCcw size={18} />}
                    onClick={() => {
                      const emptyValues: ManageSchoolFilters = {
                        first_name: '',
                        role: '',
                        status: '',
                      };
                      resetForm({ values: emptyValues });
                      onApply(emptyValues);
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
