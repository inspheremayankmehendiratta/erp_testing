'use client';

import React from 'react';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import ActionButton from '../../ActionButton';

interface PageHeaderProps {
    title?: string;
    clickHandler?: () => void;
    buttonLabel?: string;
    variant?: 'contained' | 'outlined';
    icon?: React.ReactNode;          // icon prop
    mb?: number;
    notes?: string;
    textVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    sx?: SxProps<Theme>;
    secondButtonLabel?: string;
    secondClickHandler?: () => void;


}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    clickHandler,
    buttonLabel = 'Export',
    variant = 'contained',
    secondButtonLabel,
    secondClickHandler,
    icon,
    mb = 3,
    notes = "",
    textVariant = 'h4',
    sx,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 1 : 0,
                mb: mb,
            }}
        >
            <Typography
                variant={textVariant}
                sx={[
                    {
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        letterSpacing: '-0.5px',
                        fontSize: isMobile ? '1.75rem' : '2rem',
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                {title}
            </Typography>

            {clickHandler && (
                <Grid>

                    {/* <Grid>
                        <ActionButton
                            label={buttonLabel}
                            variant={variant}
                            icon={icon}
                            clickHandler={clickHandler ?? (() => { })}
                            size="small"
                        />

                    </Grid> */}
                    <Grid container spacing={2} justifyContent="flex-end">

                        {secondButtonLabel && (
                            <Grid>
                                <ActionButton
                                    label={secondButtonLabel}
                                    variant="contained"
                                    clickHandler={secondClickHandler ?? (() => { })}
                                    size="small"
                                />
                            </Grid>
                        )}

                        {buttonLabel && (
                            <Grid>
                                <ActionButton
                                    label={buttonLabel}
                                    variant={variant}
                                    icon={icon}
                                    clickHandler={clickHandler ?? (() => { })}
                                    size="small"
                                />
                            </Grid>
                        )}

                    </Grid>


                </Grid>

            )}
            {notes &&
                <Typography
                    variant={textVariant}
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.error.main,
                        letterSpacing: '-0.5px',

                        fontSize: isMobile ? '0.75rem' : '1rem',
                    }}
                >
                    {notes}
                </Typography>}

        </Box>
    );
};

export default PageHeader;
