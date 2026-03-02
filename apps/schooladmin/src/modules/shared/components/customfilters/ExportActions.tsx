'use client';

import {
    Button,
    IconButton,
    Popover,
    Stack,
    Typography,
    alpha,
} from '@mui/material';
import { FileText, FileSpreadsheet, Printer } from 'lucide-react';
import { useState } from 'react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
interface ExportActionsProps {
    onExport: (type: "pdf-download" | "pdf-preview" | "excel" | null) => void
    loading?: boolean
    handlePdfDownload?: any
    handlePdfPreview?:any
}

const ExportActions = ({ onExport, loading = false, handlePdfDownload, handlePdfPreview }: ExportActionsProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleExcelExport = () => {
        onExport('excel');
        setAnchorEl(null);
    };
    return (
        <>
            {/* EXPORT BUTTON */}
            <IconButton onClick={() => handlePdfPreview()} size="small">
                <Printer size={20} />
            </IconButton>

            <Button
                size="small"
                variant="text"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: '21px !important' }} />}
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 22 }} />}
                sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 1.5,
                    borderRadius: '8px',
                    color: 'text.secondary',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',

                    },

                }}
            >
            </Button>

            {/* EXPORT POPOVER */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 0.5,
                        p: 1,
                        width: 200,
                        borderRadius: 1.5,
                        boxShadow: 4,
                    },
                }}
            >
                <Stack spacing={1}>
                    {/* PDF */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        onClick={() => {
                            handlePdfDownload();
                            setAnchorEl(null);
                        }}
                        sx={{
                            cursor: 'pointer',
                            px: 1,
                            py: 0.8,
                            borderRadius: 1,
                            color: '#d32f2f',
                            '&:hover': {
                                bgcolor: 'rgba(211,47,47,0.08)',
                            },
                        }}
                    >
                        <FileText size={18} />
                        <Typography fontSize={14}>Export as PDF</Typography>
                    </Stack>

                    {/* EXCEL */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        onClick={handleExcelExport}
                        sx={{
                            cursor: 'pointer',
                            px: 1,
                            py: 0.8,
                            borderRadius: 1,
                            color: '#2e7d32',
                            '&:hover': {
                                bgcolor: 'rgba(46,125,50,0.08)',
                            },
                        }}
                    >
                        <FileSpreadsheet size={18} />
                        <Typography fontSize={14}>Export as Excel</Typography>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
};

export default ExportActions;
