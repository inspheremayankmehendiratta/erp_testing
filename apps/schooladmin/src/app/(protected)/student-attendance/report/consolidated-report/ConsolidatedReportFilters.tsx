'use client';

import React from 'react';
import { Box, Button, Grid, Stack } from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomInput } from '@/modules/shared/components/forms';
import { ConsolidatedFilters } from './consolidatedReport.types';

interface FiltersProps {
  filterValues: ConsolidatedFilters;
  onApply: (values: ConsolidatedFilters) => void;
}

const defaultValues: ConsolidatedFilters = {
 class_section:"",
  date:"",
  total: undefined,
  present: undefined,
  absent: undefined,
  leave: undefined,
  sports: undefined,
  medical: undefined,
};

const CustomFilters = ({ filterValues, onApply }: FiltersProps) => {
  const initialValues: ConsolidatedFilters = filterValues;

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
                  label="Name"
                  value={values.class_section}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.class_section}
                  error={errors.class_section}
                />
              </Grid>

        



              <Grid size={{ xs: 12 }}>
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
