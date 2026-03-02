'use client';

import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

type ActionButtonVariant = 'contained' | 'outlined';
type ButtonType = 'button' | 'submit' | 'reset';
type IconPosition = 'start' | 'end';

interface ActionButtonProps {
  label: string;
  variant?: ActionButtonVariant;
  clickHandler?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;          // icon prop
  iconPosition?: IconPosition;     // start | end
  fullWidth?: boolean;
  type?: ButtonType;
  size?: 'small' | 'medium' | 'large';             // button type
  height?: number
  width?:string
  
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  variant = 'outlined',
  clickHandler,
  disabled = false,
  icon,
  iconPosition = 'start',
  fullWidth = false,
  type = 'button',
  size = 'medium',
  height = 44,
  width="fit-content"
}) => {
  const theme = useTheme();

  return (
    <Button
      type={type}
      variant={variant}
      onClick={clickHandler}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={iconPosition === 'start' ? icon : undefined}
      endIcon={iconPosition === 'end' ? icon : undefined}
      sx={{
        width:width,
        height: height,
        boxShadow: 'none',
        textTransform: 'none',
        padding: variant === 'contained' ? '10px 24px' : '10px 22px',
        borderRadius: '10px',
        fontWeight: 500,

        ...(variant === 'contained' && {
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            boxShadow: 'none',
          },
        }),

        ...(variant === 'outlined' && {
          '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }),
      }}
      size={size}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
