'use client';

import React, { useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Stack,
    IconButton,
    Tooltip,
    useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';

interface FileUploaderProps {
    id: string;
    label: string;
    name?: string;
    accept: string;
    icon: React.ReactNode;
    value: File | null;
    onChange: (file: File | null) => void;

    // ✅ MediaUpload-style props
    helperText?: string;
    tooltipText?: string;
    bgColor?: string;
    error?: string;
    helperTitle?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    id,
    label,
    accept,
    icon,
    value,
    onChange,
    helperText,
    tooltipText,
    bgColor,
    error,
    name,
    helperTitle
}) => {
    const theme = useTheme();

    // ---------------- Preview ----------------
    const preview = React.useMemo(() => {
        if (!(value instanceof File)) return null;
        return URL.createObjectURL(value);
    }, [value]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // ---------------- UI ----------------
    return (
        <Box width="100%">

            {/* Label */}
            <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: 600 }}
            >
                {label}
            </Typography>

            {/* Upload Container */}
            <Paper
                variant="outlined"
                sx={{
                    position: 'relative',
                    p: 2,
                    minHeight: 160,
                    border: '2px dashed',
                    borderColor: error
                        ? theme.palette.error.main
                        : theme.palette.divider,
                    bgcolor: bgColor || 'transparent',
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() =>
                    document.getElementById(id)?.click()
                }
            >
                {/* Info Tooltip (MediaUpload style) */}
                {tooltipText && (
                    <Tooltip title={tooltipText} arrow>
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: theme.palette.text.secondary,
                            }}
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}

                {/* Hidden Input */}
                <input
                    type="file"
                    id={id}
                    hidden
                    accept={accept}
                    name={name}
                    onChange={(e) =>
                        onChange(
                            e.target.files?.[0] ?? null
                        )
                    }
                />

                {/* ---------------- Preview ---------------- */}
                {preview ? (
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* Delete */}
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(null);
                            }}
                            sx={{
                                position: 'absolute',
                                top: -10,
                                right: -10,
                                bgcolor:
                                    theme.palette
                                        .background.paper,
                                boxShadow: 1,
                            }}
                            size="small"
                        >
                            <DeleteIcon
                                color="error"
                                fontSize="small"
                            />
                        </IconButton>

                        {/* PDF */}
                        {value?.type ===
                            'application/pdf' ? (
                            <Stack
                                alignItems="center"
                                spacing={1}
                            >
                                <DescriptionIcon
                                    sx={{
                                        fontSize: 48,
                                        color: 'error.main',
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ maxWidth: 200 }}
                                >
                                    {value.name}
                                </Typography>
                            </Stack>
                        ) : (
                            /* Image */
                            <Image
                                src={preview}
                                alt={label}
                                width={110}
                                height={110}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                    </Box>
                ) : (
                    /* Empty */
                    <Stack
                        alignItems="center"
                        spacing={1}
                    >
                        {icon}

                        <Typography variant="body2">
                            Click to upload{' '}
                            {label.toLowerCase()}
                        </Typography>
                    </Stack>
                )}
            </Paper>

            {/* Helper Text → MediaUpload style */}
            {helperText && (
                <Box mt={1}>
                    {helperTitle && (
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.warning.main,
                                display: 'block',
                            }}
                        >
                            {helperTitle}
                        </Typography>
                    )}

                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            color: theme.palette.primary.main,
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {helperText}
                    </Typography>
                </Box>
            )}


            {/* Error */}
            {error && (
                <Typography
                    color="error"
                    variant="caption"
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default FileUploader;
