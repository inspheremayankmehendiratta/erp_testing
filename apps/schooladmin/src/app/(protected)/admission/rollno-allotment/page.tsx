'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Popover,
  Stack,
  TablePagination,
  useTheme,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import {
  Eye,
  Filter,
  Pencil,
  Trash2,

} from 'lucide-react';
import * as Yup from 'yup';

import { Form, Formik } from 'formik';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomSelect } from '@/modules/shared/components/forms';




const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Admission', path: '#' },
  { label: 'Roll No Allotment', path: '#' },
];

const RollNoAllotment = () => {
  const theme = useTheme();
 
  const documentOptions = [

    { label: 'PRE PRIMARY', value: 'pre-primary' },
    { label: 'I', value: 'i' },
    { label: 'II', value: 'ii' },
    { label: 'III', value: 'iii' },
    { label: 'IV', value: 'iv' },
    { label: 'V', value: 'v' },
    { label: 'VI', value: 'vi' },
    { label: 'VII', value: 'vii' },
    { label: 'VIII', value: 'viii' },
    { label: 'IX', value: 'ix' },
    { label: 'X', value: 'x' },
    { label: 'XI', value: 'xi' }
  ];

  const classOptions = [
    { label: 'Select Class', value: 'select-class' },
    { label: "B", value: "b" },
    { label: "C", value: "c" },
    { label: "D", value: "d" },
    { label: "AA", value: "aa" },
  ];

  // Validation Schema

  const validationSchema = Yup.object({
    wing: Yup.string().required('Wing is required'),
    fullName: Yup.string().required('Full name is required'),
  });

  // Initial Values

  const initialValues = {
    StudentImage: '',
    fullName: '',
  };



  return (
    <Box>
      {/* ===== Breadcrumbs & Header ===== */}
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Roll No Allotment"
        />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Values 👉', values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form noValidate>
            <Paper
              sx={{
                px: 2,
                py: 1,
                mb: 3,
              }}
            >
              <Box>

                <Grid container spacing={2}>


                  {/* wing */}
                  <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <CustomSelect
                      id="StudentImage"
                      name="StudentImage"
                      label='Select Class'
                      value={values.StudentImage}
                      options={documentOptions}
                      placeholder="Select Class"
                      required
                      touched={touched.StudentImage}
                      error={errors.StudentImage}
                      onChange={(e) =>
                        setFieldValue('StudentImage', e.target.value)
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 300,   // 👈 dropdown height
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* wing */}
                  <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                    <CustomSelect
                      id="StudentImage"
                      name="StudentImage"
                      value={values.StudentImage}
                      options={classOptions}
                      label='Select Section'
                      placeholder="Select Section*"
                      touched={touched.StudentImage}
                      error={errors.StudentImage}
                      required
                      onChange={(e) =>
                        setFieldValue('StudentImage', e.target.value)
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 300,   // 👈 dropdown height
                          },
                        },
                      }}
                    />
                  </Grid>
                  {/* Submit */}
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                      >
                        Filter
                      </Button>

                    </Box>
                  </Grid>


                </Grid>
              </Box>


            </Paper>
          </Form>
        )}
      </Formik>

    </Box>
  );
};

export default RollNoAllotment;
