'use client';

import React from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Filter, RotateCcw } from 'lucide-react';
import { Formik, Form } from 'formik';
import { CustomDatePicker, CustomInput, CustomSelect } from '@/modules/shared/components/forms';
import { AttendanceSummaryFilters } from './attendanceSummary.types';

interface FiltersProps {
    filterValues: AttendanceSummaryFilters;
    onApply: (values: AttendanceSummaryFilters) => void;
    onReset: (values: AttendanceSummaryFilters) => void;
}

const CustomFilters = ({ filterValues, onApply, onReset }: FiltersProps) => {
    const initialValues: AttendanceSummaryFilters = filterValues;

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values) => {
                onApply(values);
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
                <Form>
                    <Paper
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
                                    label="Select Class section"
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
                                <CustomInput
                                    id="name"
                                    name="name"
                                    label="Enter Admission number"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.name}
                                    error={errors.name}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                                <CustomDatePicker
                                    id="activeFrom"
                                    name="activeFrom"
                                    label="From Year"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
                                <CustomDatePicker
                                    id="activeFrom"
                                    name="activeFrom"
                                    label="To Year"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 3.5 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<RotateCcw size={18} />}
                                        onClick={() => {
                                            const emptyValues: AttendanceSummaryFilters = {
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
