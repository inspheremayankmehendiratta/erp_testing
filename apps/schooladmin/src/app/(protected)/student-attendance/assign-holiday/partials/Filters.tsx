'use client';

import {
  Grid,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomSelect } from '@/modules/shared/components/forms/CustomSelect';
import { CustomDatePicker } from '@/modules/shared/components/forms/CustomDatePicker';
import dayjs from 'dayjs';
import { AssignHolidayFilters } from '../assignHoliday.types';
import { CustomInput } from '@/modules/shared/components/forms';

interface FiltersProps {
  filterValues: any;
  onApply: (values: any) => void;
}


const CustomFilters = ({ filterValues, onApply }: FiltersProps) => {
  const initialValues: AssignHolidayFilters = filterValues;

  const maxDate = dayjs().subtract(17, 'year');
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
                    { value: '12', label: 'Arunachal Pradesh' },
                    { value: '10', label: 'Bihar' },
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

              <Grid size={{ xs: 12 }}>
                <CustomInput
                  id="name"
                  name="name"
                  label="Enter Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.name}
                  error={errors.name}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<RotateCcw size={18} />}
                    onClick={() => {
                      const emptyValues: AssignHolidayFilters = {
                        state: '',
                        status: '',
                        activeFrom: '',
                        activeTo: '',
                        name: '',
                        subscription: '',
                      };

                      resetForm({ values: emptyValues }); // 👈 Reset Formik UI
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
