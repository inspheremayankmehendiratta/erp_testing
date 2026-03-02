import React from 'react';
import { Stack, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent, useTheme, SelectProps } from '@mui/material';
// import { SelectProps } from "@mui/material/Select";

interface Option {
    value: string | number;
    label: string;
}

interface CustomSelectProps {
    id: string;
    name: string;
    label?: string;
    value: string | number | undefined |null;
    onChange: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    options: Option[];
    error?: string;
    touched?: boolean;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    MenuProps?: SelectProps["MenuProps"];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
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
    MenuProps
}) => {
    const theme = useTheme();
    const hasError = Boolean(touched && error);

    return (
        <Stack spacing={0.75} sx={{ mb: 2.5 }}>
            <InputLabel
                htmlFor={id}
                error={hasError}
                sx={{
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    color: hasError ? theme.palette.error.main : theme.palette.text.primary,
                    mb: 0.5,
                    transition: 'color 0.3s ease',
                    '&.Mui-focused': {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                {label} {required && <span style={{ color: theme.palette.error.main }}>*</span>}
            </InputLabel>
            <Select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                displayEmpty
                disabled={disabled}
                MenuProps={MenuProps}
                error={hasError}
                sx={{
                    height: 44,
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    "& .MuiSelect-select": {
                        padding: "10px 14px",
                        boxSizing: "border-box",
                        fontSize: '0.9375rem',
                        color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.divider,
                        transition: 'border-color 0.3s ease',
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
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.action.disabledBackground,
                    },
                }}
            >
                {placeholder && (
                    <MenuItem value="" disabled>
                        <span style={{ color: theme.palette.text.secondary, opacity: 0.7 }}>{placeholder}</span>
                    </MenuItem>
                )}
                {options.map((opt) => (
                    <MenuItem
                        key={opt.value}
                        value={opt.value}
                        sx={{
                            '&:hover': {
                                backgroundColor: theme.palette.primary.light,
                            },
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light,
                                },
                            },
                        }}
                    >
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
            {hasError && (
                <FormHelperText
                    error
                    sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        mt: 0.5,
                    }}
                >
                    {error}
                </FormHelperText>
            )}
        </Stack>
    );
};