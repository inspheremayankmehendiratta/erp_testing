
"use client"
import React from 'react';
import {
    Stack,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Checkbox,
    ListItemText,
    SelectChangeEvent,
    useTheme,
} from '@mui/material';

interface Option {
    value: string | number;
    label: string;
}

interface CustomMultiSelectProps {
    id: string;
    name: string;
    label?: string;
    value: (string | number)[];
    onChange: (event: SelectChangeEvent<any>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    options: Option[];
    error?: string;
    touched?: boolean | any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    options,
    error,
    touched,
    required,
    disabled,
    placeholder,
}) => {

    const theme = useTheme();
    const hasError = Boolean(touched && error);

    const selectedValues = Array.isArray(value) ? value : [];

    return (
        <Stack spacing={0.75} sx={{ mb: 1 }}>
            <InputLabel
                htmlFor={id}
                error={hasError}
                sx={{
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    color: hasError
                        ? theme.palette.error.main
                        : theme.palette.text.primary,
                    mb: 0.5,
                }}
            >
                {label} {required && <span style={{ color: theme.palette.error.main }}>*</span>}
            </InputLabel>



            <Select
                id={id}
                name={name}
                multiple
                value={selectedValues}   // ✅ always array
                onChange={onChange}
                onBlur={onBlur}
                displayEmpty
                disabled={disabled}
                error={hasError}
                renderValue={(selected) => {
                    if (!selected || selected.length === 0) {
                        return (
                            <span style={{ color: theme.palette.text.secondary }}>
                                {placeholder ?? "Select"}
                            </span>
                        );
                    }

                    return `${selected.length} selected`;
                }}
                sx={{
                    height: 32,
                    borderRadius: '8px',
                    "& .MuiSelect-select": {
                        padding: "5px 14px",
                        fontSize: '0.9rem',
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px',
                    },
                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.error.main,
                    },
                }}
            >
                {options.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                        <Checkbox checked={selectedValues.includes(opt.value)} />
                        <ListItemText primary={opt.label} />
                    </MenuItem>
                ))}
            </Select>

            {hasError && (
                <FormHelperText error sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                    {error}
                </FormHelperText>
            )}
        </Stack>
    );
};
