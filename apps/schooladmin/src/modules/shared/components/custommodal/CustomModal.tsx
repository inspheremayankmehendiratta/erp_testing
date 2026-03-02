'use client';

import React, { ReactNode } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: number | string;
  showCloseIcon?: boolean;
  footer?: ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  width = 500,
  showCloseIcon = true,
  footer,
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        {(title || showCloseIcon) && (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
            >
              <Typography
                id="custom-modal-title"
                variant="h6"
              >
                {title}
              </Typography>

              {showCloseIcon && (
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </Box>

            <Divider />
          </>
        )}

        {/* Body */}
        <Box
          p={2}
          sx={{
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        {footer && (
          <>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
              gap={1}
            >
              {footer}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
