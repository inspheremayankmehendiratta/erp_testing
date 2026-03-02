'use client';

import {
  Grid,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomSelect } from '../forms/CustomSelect';
import { CustomDatePicker } from '../forms/CustomDatePicker';
import dayjs from 'dayjs';

interface FiltersProps {
  onApply: (values: any) => void;
}

const initialValues = {
  state: '',
  status: '',
  activeFrom: '',
  activeTo: '',
  schoolType: '',
  subscription: '',
};

const CustomFilters = ({ onApply }: FiltersProps) => {
  const maxDate = dayjs().subtract(17, 'year');

  return (
    <Box sx={{ p: 2 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onApply(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <CustomSelect
                  id="state"
                  name="state"
                  label="Select State"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.state}
                  error={errors.state}
                  options={[
                    { value: 'KA', label: 'Karnataka' },
                    { value: 'MH', label: 'Maharashtra' },
                  ]}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomSelect
                  id="status"
                  name="status"
                  label="Select Status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.status}
                  error={errors.status}
                  options={[
                    { value: 'enabled', label: 'Enabled' },
                    { value: 'disabled', label: 'Disabled' },
                  ]}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomDatePicker
                  id="activeFrom"
                  name="activeFrom"
                  label="Active Users From"
                  maxDate={maxDate}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomDatePicker
                  id="activeTo"
                  name="activeTo"
                  label="Active Users To"
                  maxDate={maxDate}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomSelect
                  id="schoolType"
                  name="schoolType"
                  label="School Type"
                  value={values.schoolType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.schoolType}
                  error={errors.schoolType}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'private', label: 'Private' },
                  ]}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <CustomSelect
                  id="subscription"
                  name="subscription"
                  label="Subscription"
                  value={values.subscription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.subscription}
                  error={errors.subscription}
                  options={[
                    { value: 'free', label: 'Free' },
                    { value: 'paid', label: 'Paid' },
                  ]}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<RotateCcw size={18} />}
                    onClick={() => resetForm()}
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