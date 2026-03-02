import React, { useMemo, useState } from "react";
import {
    Stack,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    SxProps,
    Theme,
    useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type CustomInputProps = {
    id: string;
    name: string;
    label?: string;
    value: string | number | undefined | null;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    type?: React.HTMLInputTypeAttribute; // text | email | password | number etc.
    placeholder?: string;
    required?: boolean;
    touched?: boolean;
    error?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    height?: number;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    // 🔥 Password toggle
    enablePasswordToggle?: boolean;
    // 🔥 Number only (works even if type="text")
    numberOnly?: boolean;
    // Optional max length (useful for mobile, otp etc.)
    maxLength?: number;
    // Styling
    sx?: SxProps<Theme>;
    inputSx?: SxProps<Theme>;
};

const CustomInput: React.FC<CustomInputProps> = ({
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    type = "text",
    placeholder,
    required = false,
    touched = false,
    error,
    disabled = false,
    fullWidth = true,
    height = 44,
    startAdornment,
    endAdornment,
    enablePasswordToggle = false,
    numberOnly = false,
    maxLength,
    sx,
    inputSx,
}) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const hasError = Boolean(touched && error);

    // if password toggle enabled, we manage the input type
    const finalType = useMemo(() => {
        if (enablePasswordToggle && type === "password") {
            return showPassword ? "text" : "password";
        }
        return type;
    }, [enablePasswordToggle, showPassword, type]);

    // wrapper for numberOnly
    const handleNumberOnlyChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        if (!numberOnly) {
            onChange(e);
            return;
        }

        const inputValue = e.target.value;

        // Allow: empty (for backspace), only digits
        if (inputValue === "" || /^[0-9]+$/.test(inputValue)) {
            onChange(e);
        }
    };

    // create dynamic endAdornment:
    // priority: password toggle icon + provided endAdornment
    const finalEndAdornment = useMemo(() => {
        const adornments: React.ReactNode[] = [];

        if (enablePasswordToggle && type === "password") {
            adornments.push(
                <IconButton
                    key="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    sx={{
                        color: theme.palette.primary.main,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: theme.palette.primary.dark,
                        },
                    }}
                >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
            );
        }

        if (endAdornment) {
            adornments.push(<React.Fragment key="custom-end">{endAdornment}</React.Fragment>);
        }

        if (adornments.length === 0) return undefined;

        return (
            <InputAdornment position="end">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    {adornments}
                </Stack>
            </InputAdornment>
        );
    }, [enablePasswordToggle, endAdornment, showPassword, type, theme]);

    const finalStartAdornment = useMemo(() => {
        if (!startAdornment) return undefined;
        return (
            <InputAdornment position="start" sx={{ color: theme.palette.primary.main }}>
                {startAdornment}
            </InputAdornment>
        );
    }, [startAdornment, theme]);

    return (
        <Stack sx={{ gap: 0.75, mb: 2.5, ...sx }}>
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

            <OutlinedInput
                id={id}
                name={name}
                type={finalType}
                value={value}
                onBlur={onBlur}
                onChange={handleNumberOnlyChange}
                placeholder={placeholder}
                fullWidth={fullWidth}
                disabled={disabled}
                error={hasError}
                sx={{
                    height,
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    ...inputSx,
                    '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        height: '100%',
                        boxSizing: 'border-box',
                        fontSize: '0.9375rem',
                        color: theme.palette.text.primary,
                        transition: 'color 0.3s ease',
                        
                        '&::placeholder': {
                            color: theme.palette.text.secondary,
                            opacity: 0.7,
                        },
                    },
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset !important`,
                        WebkitTextFillColor: theme.palette.text.primary,
                        caretColor: theme.palette.primary.main,
                        transition: 'background-color 9999s ease-in-out 0s',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
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
                startAdornment={finalStartAdornment}
                endAdornment={finalEndAdornment}
                inputProps={{
                    maxLength,
                    inputMode: numberOnly ? "numeric" : undefined,
                }}
            />

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

export default CustomInput;