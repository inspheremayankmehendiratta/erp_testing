'use client';

import { Box, IconButton, Button, Stack, useTheme } from '@mui/material';
import {
    Flame,
    Filter,
    Printer,
    LayoutGrid,
    MessageSquare,
    Plus,
    RefreshCw,
} from 'lucide-react';

interface ToolbarActionsProps {
    onCreate?: () => void;
}

const ToolbarActions = ({ onCreate }: ToolbarActionsProps) => {

    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: '#fff',
            }}
        >
            {/* Left icons */}
            <Stack direction="row" spacing={1}>
                <IconWrapper color="#ffedd5">
                    <RefreshCw size={18} />
                </IconWrapper>


                <IconWrapper color="#fef3c7">
                    <Filter size={18} />
                </IconWrapper>

                <IconWrapper color="#fde68a">
                    <Printer size={18} />
                </IconWrapper>

                <IconWrapper color="#dcfce7">
                    <LayoutGrid size={18} />
                </IconWrapper>

                <IconWrapper color="#fee2e2">
                    <MessageSquare size={18} />
                </IconWrapper>
            </Stack>

            {/* Right button */}
            <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={onCreate}
                sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    backgroundColor: theme.palette.warning.main,
                    color: '#000',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#eab308',
                    },
                }}
            >
                Create
            </Button>
        </Box>
    );
};

export default ToolbarActions;

/* ---------- Reusable icon wrapper ---------- */
const IconWrapper = ({
    children,
    color,
}: {
    children: React.ReactNode;
    color: string;
}) => {
    return (
        <IconButton
            sx={{
                backgroundColor: color,
                borderRadius: 2,
                width: 40,
                height: 40,
                '&:hover': {
                    backgroundColor: color,
                },
            }}
        >
            {children}
        </IconButton>
    );
};
