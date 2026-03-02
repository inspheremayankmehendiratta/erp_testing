'use client';

import {
  Grid,
  Button,
  Stack,
  Box,
  Paper,
} from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomSelect } from '@/modules/shared/components/forms/CustomSelect';
import { CustomInput } from '@/modules/shared/components/forms';
import { SlcCertificatesFilters } from './SlcCertificates.types';
import { FieldWiseModifyFilters } from '../field-wise-modify/FieldWiseModify.types';

interface FiltersProps {
  filterValues: any;
  onApply: (values: any) => void;
  onReset: (values: SlcCertificatesFilters) => void;
}

// options are duplicated here; you may extract them to constants if reused
const documentOptions = [
  { label: 'Select Class-Section', value: '' },
  { label: 'PRE PRIMARY-A', value: 'pre-primary-a' },
  { label: 'PRE PRIMARY-B', value: 'pre-primary-b' },
  { label: 'PRE PRIMARY-C', value: 'pre-primary-c' },
  { label: 'PRE PRIMARY-D', value: 'pre-primary-d' },
  { label: 'PRE PRIMARY-E', value: 'pre-primary-e' },
  { label: 'I-B', value: 'i-b' },
  { label: 'I-C', value: 'i-c' },
  { label: 'I-D', value: 'i-d' },
  { label: 'I-aa', value: 'i-aa' },
  { label: 'II-A', value: 'ii-a' },
  { label: 'II-B', value: 'ii-b' },
  { label: 'II-C', value: 'ii-c' },
  { label: 'II-D', value: 'ii-d' },
  { label: 'III-A', value: 'iii-a' },
  { label: 'III-B', value: 'iii-b' },
  { label: 'III-C', value: 'iii-c' },
  { label: 'III-D', value: 'iii-d' },
  { label: 'IV-A', value: 'iv-a' },
  { label: 'IV-B', value: 'iv-b' },
  { label: 'IV-C', value: 'iv-c' },
  { label: 'IV-D', value: 'iv-d' },
  { label: 'V-A', value: 'v-a' },
  { label: 'V-B', value: 'v-b' },
  { label: 'V-C', value: 'v-c' },
  { label: 'V-D', value: 'v-d' },
  { label: 'VI-A', value: 'vi-a' },
  { label: 'VI-B', value: 'vi-b' },
  { label: 'VI-C', value: 'vi-c' },
  { label: 'VI-D', value: 'vi-d' },
  { label: 'VI-E', value: 'vi-e' },
  { label: 'VII-A', value: 'vii-a' },
  { label: 'VII-B', value: 'vii-b' },
  { label: 'VII-C', value: 'vii-c' },
  { label: 'VII-D', value: 'vii-d' },
  { label: 'VIII-A', value: 'viii-a' },
  { label: 'VIII-B', value: 'viii-b' },
  { label: 'VIII-C', value: 'viii-c' },
  { label: 'VIII-D', value: 'viii-d' },
  { label: 'IX-A', value: 'ix-a' },
  { label: 'IX-B', value: 'ix-b' },
  { label: 'IX-C', value: 'ix-c' },
  { label: 'IX-D', value: 'ix-d' },
  { label: 'X-A', value: 'x-a' },
  { label: 'X-B', value: 'x-b' },
  { label: 'X-C', value: 'x-c' },
  { label: 'X-D', value: 'x-d' },
  { label: 'XI-A', value: 'xi-a' },
  { label: 'XI-B', value: 'xi-b' },
  { label: 'XI-C', value: 'xi-c' }
];
const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Generated', value: 'generated' },
];

const CustomFilters = ({ filterValues, onApply, onReset }: FiltersProps) => {
  const initialValues: any = filterValues;

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => {
          onApply(values);
        }}
      >
        {({ values, handleChange, handleBlur, resetForm, setFieldValue }) => (
          <Form>
            <Paper
              sx={{
                px: 2,
                py: 1,
                mb: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomSelect
                    id="classSection"
                    name="classSection"
                    value={values.classSection}
                    options={documentOptions}
                    placeholder="Class Section"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomInput
                    id="admissionNo"
                    name="admissionNo"
                    value={values.admissionNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Admission No."
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <CustomSelect
                    id="status"
                    name="status"
                    value={values.status}
                    options={statusOptions}
                    placeholder="Select Status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 300 },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<RotateCcw size={18} />}
                      onClick={() => {
                        const emptyValues: FieldWiseModifyFilters = {
                          state: '',
                          name: '',
                        };
                        onReset(emptyValues); // 👈 Reset parent state
                        resetForm({ values: emptyValues }); // 👈 Reset Formik UI
                      }}
                    >
                      Reset
                    </Button>
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
                      Filter
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CustomFilters;