'use client';

import React, { useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    FormHelperText,
    useTheme
} from '@mui/material';

type FileUploadProps = {
    label?: string;
    accept?: string;        // e.g. "image/*,.pdf"
    maxSizeMB?: number;    // file size restriction
    helperText?: string;
    error?: boolean;
    file: File | null;
    onChange: (file: File | null) => void;
};

export const CutomFormFileUpload: React.FC<FileUploadProps> = ({
    label = 'Upload File',
    accept,
    maxSizeMB,
    helperText,
    error,
    file,
    onChange
}) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleBrowse = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            onChange(null);
            return;
        }

        // Size validation
        if (maxSizeMB) {
            const sizeInMB = selectedFile.size / (1024 * 1024);
            if (sizeInMB > maxSizeMB) {
                alert(`File must be smaller than ${maxSizeMB} MB`);
                return;
            }
        }

        onChange(selectedFile);
    };

    return (
        <Box>
            {/* Label */}
            {label && (
                <Typography
                    variant="subtitle2"
                    mb={1}
                    fontWeight={500}
                >
                    {label}
                </Typography>
            )}

            {/* Upload Container */}
            <Box
                display="flex"
                alignItems="center"
                border={`1px solid ${error
                        ? theme.palette.error.main
                        : theme.palette.grey[400]
                    }`}
                borderRadius={2}
                px={1}
                py={1}
                width="100%"
                bgcolor={theme.palette.background.default}
            >
                {/* Hidden Input */}
                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={accept || '*'}   // allow all if not passed
                    onChange={handleFileChange}
                />

                {/* Browse Button */}
                <Button
                    variant="contained"
                    onClick={handleBrowse}
                    sx={{
                        mr: 2,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                        boxShadow: 'none',
                        '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            boxShadow: 'none'
                        }
                    }}
                >
                    Browse
                </Button>

                {/* File Name */}
                <Typography
                    variant="body2"
                    color={file ? 'text.primary' : 'text.secondary'}
                >
                    {file ? file.name : 'No File Chosen'}
                </Typography>
            </Box>

            {/* Helper / Note */}
            {(helperText || maxSizeMB) && (
                <FormHelperText error={error}>
                    {helperText ||
                        `Max file size: ${maxSizeMB} MB`}
                </FormHelperText>
            )}
        </Box>
    );
};
