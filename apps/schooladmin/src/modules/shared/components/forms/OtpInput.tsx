import React, { useRef } from "react";
import { Stack, InputLabel, OutlinedInput, FormHelperText, Box } from "@mui/material";

type OtpInputProps = {
  label?: string;
  numInputs: number;
  value: string;
  onChange: (otp: string) => void;
  error?: string;
  touched?: boolean;
};


const OtpInput: React.FC<OtpInputProps> = ({
  label = "Enter OTP",
  numInputs,
  value,
  onChange,
  error,
  touched,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const hasError = Boolean(touched && error);

  const otpValue = value.padEnd(numInputs, "");

  const handleChange = (index: number, digit: string) => {
    if (!/^\d?$/.test(digit)) return;

    const otpArray = otpValue.split("");
    otpArray[index] = digit;

    onChange(otpArray.join("").trimEnd());

    if (digit && index < numInputs - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (otpValue[index]) {
        const otpArray = otpValue.split("");
        otpArray[index] = "";
        onChange(otpArray.join("").trimEnd());
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <Stack spacing={1} alignItems="center">
      {label && <InputLabel error={hasError}>{label}</InputLabel>}

      <Stack direction="row" spacing={1.5} justifyContent="center">
        {Array.from({ length: numInputs }).map((_, index) => (
          <OutlinedInput
            key={index}
            inputRef={(el) => (inputsRef.current[index] = el)}
            value={otpValue[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            error={hasError}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              style: { textAlign: "center", fontSize: 18, padding: 0 },
            }}
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              "& .MuiOutlinedInput-input": { padding: 0 },
            }}
          />
        ))}
      </Stack>

      {hasError && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
};


export default OtpInput;
