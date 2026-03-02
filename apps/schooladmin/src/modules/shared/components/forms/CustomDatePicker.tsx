'use client';

import React from 'react';
import {
    Stack,
    InputLabel,
    FormHelperText,
    TextField,
    SxProps,
    Theme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useFormikContext, useField } from 'formik';

interface CustomDatePickerProps {
    id: string;
    name: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    height?: number;
    sx?: SxProps<Theme>;
    inputSx?: SxProps<Theme>;
    maxDate?: any;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    id,
    name,
    label,
    required = false,
    fullWidth = true,
    height = 45,
    sx,
    inputSx,
    maxDate,
}) => {
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext<any>() || {};
    const [field, meta] = useField(name);
    const [open, setOpen] = React.useState(false);

    // Use the error and touched state directly from useField
    const hasError = Boolean(meta.touched && meta.error);

    const handleClose = () => {
        setOpen(false);
        if (setFieldTouched) {
            setFieldTouched(name, true, true);
        }
    };

    const lastDayOfPrevYear = dayjs().subtract(1, 'year').endOf('year');

    const handleChange = (newValue: dayjs.Dayjs | null) => {
        if (setFieldValue) {
            const dateValue = newValue && newValue.isValid() ? newValue.toISOString() : '';
            // Pass true as 3rd param to setFieldValue to trigger validation immediately
            setFieldValue(name, dateValue, true).then(() => {
                // Manually trigger field validation to be certain the error clears
                if (validateField) validateField(name);
            });
        }
    };

    return (
        <Stack sx={{ gap: 1, mb: 2, ...sx }}>
            <InputLabel htmlFor={id} error={hasError}>
                {label} {required ? "*" : ""}
            </InputLabel>

            <DatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={handleChange}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={handleClose}
                maxDate={maxDate || lastDayOfPrevYear}
                slotProps={{
                    textField: {
                        id,
                        name,
                        fullWidth,
                        error: hasError,
                        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                            field.onBlur(e);
                        },
                        placeholder: `Select ${label?.toLowerCase()}`,
                        onClick: () => setOpen(true),
                        InputProps: {
                            sx: {
                                height: height,
                                ...inputSx,
                                '& .MuiOutlinedInput-input': {
                                    padding: '10px 14px',
                                    height: '100%',
                                    boxSizing: 'border-box',
                                },
                            }
                        },
                        sx: {
                            cursor: 'pointer',
                        }
                    },
                }}
            />

            {hasError && <FormHelperText error>{meta.error}</FormHelperText>}
        </Stack>
    );
};
