'use client';

import React, { useRef, useCallback } from 'react';
import {
    Box,
    Button,
    Typography,
    Stack,
    Paper,
    Tooltip,
    IconButton,
    useTheme,
} from '@mui/material';
import {
    Image as ImageIcon,
    Cloud,
    FileText,
    Info,
} from 'lucide-react';
import ActionButton from '../../ActionButton';

interface MediaUploadProps {
    id: string;
    value: File | null;
    onChange: (file: File | null) => void;
    helperText?: string;
    tooltipText?: string;
    maxSizeKB?: number;
    btnName?: string;
}

const ALLOWED_IMAGE_EXTENSIONS = [
    'png',
    'jpg',
    'jpeg',
    'svg',
    'webp',
    'ico',
    'gif',
    'bmp',
    'avif',
];

const MediaUpload: React.FC<MediaUploadProps> = ({
    id,
    value,
    onChange,
    helperText = 'Please upload an image file (logo, favicon, etc.) with maximum size 100KB',
    tooltipText = 'Supported formats: PNG, JPG, SVG, WEBP, ICO, GIF, AVIF',
    maxSizeKB = 100,
    btnName=""
}) => {
    const theme = useTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    const isValidImage = (file: File) => {
        if (file.type.startsWith('image/')) return true;
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext ? ALLOWED_IMAGE_EXTENSIONS.includes(ext) : false;
    };

    const handleFile = useCallback(
        (file: File | null) => {
            if (!file) return;
            if (!isValidImage(file)) return;
            if (file.size / 1024 > maxSizeKB) return;
            onChange(file);
        },
        [maxSizeKB, onChange]
    );

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0] ?? null);
    };

    return (
        <Box>
            <Paper
                variant="outlined"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                sx={{
                    position: 'relative',
                    p: { xs: 2.5, sm: 3 },
                    minHeight: 190,
                    border: '2px dashed',
                    borderColor: theme.palette.primary.light,
                    bgcolor: theme.palette.primary.light,
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Info Tooltip */}
                <Tooltip title={tooltipText} arrow>
                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: theme.palette.text.secondary,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Info size={16} />
                    </IconButton>
                </Tooltip>

                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />

                <Stack spacing={1.5} alignItems="center">
                    <Stack direction="row" spacing={1}>
                        <ImageIcon size={26} color={theme.palette.primary.main} />
                        <Cloud size={26} color={theme.palette.primary.main} />
                        <FileText size={26} color={theme.palette.primary.main} />
                    </Stack>

                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            fontSize: { xs: 13, sm: 14 },
                        }}
                    >
                        Drag & Drop Your Files Here
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        Or
                    </Typography>

                    <ActionButton
                        label={btnName}
                        variant="contained"
                    />


                    {value && (
                        <Typography variant="caption" color="text.secondary">
                            {value.name}
                        </Typography>
                    )}
                </Stack>
            </Paper>

            <Typography
                variant="caption"
                sx={{
                    mt: 1,
                    display: 'block',
                    color: theme.palette.primary.main,
                }}
            >
                Note : {helperText}
            </Typography>
        </Box>
    );
};

export default MediaUpload;
