'use client';
import FileUploader from '@/modules/shared/components/forms/FileUploader';
import {
    Box,
    Paper,

    useTheme,
} from '@mui/material';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';




export const FieldWiseImport = () => {
    const theme = useTheme();
     const [logo, setLogo] = useState<File | null>(null);


    return (
        <Box>

            <Paper
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
                    p: { xs: 1, sm: 4, md: 3 },
                }}
            >
                <FileUploader
                    id="company-logo"
                    name="logo"
                    label="School Import"
                    accept="image/*"
                    value={logo}
                    onChange={setLogo}
                    icon={<ImageIcon fontSize="large" color="primary" />}
                    helperText={"Please upload an image file (logo, favicon, etc.) with maximum size 100KB"}
                    bgColor={theme.palette.primary.light}
                    tooltipText="Supported: PNG, JPG, SVG"
                />
            </Paper>
        </Box>
    );
};

