'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useColorScheme } from '@mui/material/styles';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

export default function ThemeToggler() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <IconButton color="inherit" disabled>
                <LightModeIcon />
            </IconButton>
        );
    }

    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value: 'light' | 'dark' | 'system') => {
        setMode(value);
        handleClose();
    };

    const getIcon = () => {
        if (mode === 'dark') return <DarkModeIcon />;
        if (mode === 'light') return <LightModeIcon />;
        return <SettingsBrightnessIcon />;
    };

    const getTooltip = () => {
        if (mode === 'dark') return 'Dark mode';
        if (mode === 'light') return 'Light mode';
        return 'System mode';
    };

    return (
        <>
            <Tooltip title={getTooltip()}>
                <IconButton color="inherit" onClick={handleOpen}>
                    {getIcon()}
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem selected={mode === 'light'} onClick={() => handleSelect('light')}>
                    <ListItemIcon>
                        <LightModeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Light</ListItemText>
                </MenuItem>

                <MenuItem selected={mode === 'dark'} onClick={() => handleSelect('dark')}>
                    <ListItemIcon>
                        <DarkModeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dark</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

