import React from "react";
import {
  Stack,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";

type CustomTextareaProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;

  // textarea-specific
  rows?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;

  // Styling
  sx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
};

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  touched = false,
  error,
  disabled = false,
  fullWidth = true,
  rows = 4,
  minRows,
  maxRows,
  maxLength,
  sx,
  inputSx,
}) => {
  const theme = useTheme();
  const hasError = Boolean(touched && error);

  return (
    <Stack sx={{ gap: 0.75, mb: 2.5, ...sx }}>
      <InputLabel
        htmlFor={id}
        error={hasError}
        sx={{
          fontWeight: 500,
          fontSize: "0.9375rem",
          color: hasError
            ? theme.palette.error.main
            : theme.palette.text.primary,
          mb: 0.5,
          transition: "color 0.3s ease",
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }}
      >
        {label}{" "}
        {required && (
          <span style={{ color: theme.palette.error.main }}>*</span>
        )}
      </InputLabel>

      <OutlinedInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        fullWidth={fullWidth}
        disabled={disabled}
        error={hasError}
        multiline
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        sx={{
          borderRadius: "8px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          ...inputSx,

          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
            fontSize: "0.9375rem",
            lineHeight: 1.5,
            color: theme.palette.text.primary,
            resize: "vertical",

            "&::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 0.7,
            },
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.divider,
            transition: "border-color 0.3s ease",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },

          "&.Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        }}
        inputProps={{
          maxLength,
        }}
      />

      {hasError && (
        <FormHelperText
          error
          sx={{
            fontSize: "0.8125rem",
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


