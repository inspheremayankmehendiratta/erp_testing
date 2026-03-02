'use client';

import React from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomDatePicker, CustomInput, CustomSelect } from '@/modules/shared/components/forms';
import { DailyAttendanceSheetFilters } from './dailyAttendanceSheet.types';



interface FiltersProps {
  filterValues: DailyAttendanceSheetFilters;
  onApply: (values: DailyAttendanceSheetFilters) => void;
  onReset: (values: DailyAttendanceSheetFilters) => void;
}

const CustomFilters = ({ filterValues, onApply, onReset }: FiltersProps) => {
  const initialValues: DailyAttendanceSheetFilters = filterValues;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => {
        onApply(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
        <Form> <Paper
          sx={{
            px: 2,
            py: 1,
            mb: 3,
          }}
        >

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <CustomSelect
                id="state"
                name="state"
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
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <CustomDatePicker
                id="activeFrom"
                name="activeFrom"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<RotateCcw size={18} />}
                  onClick={() => {
                    const emptyValues: DailyAttendanceSheetFilters = {
                      state: '',
                      name: '',
                    };
                    onReset(emptyValues); // 👈 Reset parent state
                    resetForm({ values: emptyValues }); // 👈 Reset Formik UI
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
        </Paper>

        </Form>
      )}
    </Formik>
  );
};

export default CustomFilters;
