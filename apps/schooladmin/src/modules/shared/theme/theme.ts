//theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: '#F8FAFC',
                    paper: '#FFFFFF',
                },
                text: {
                    primary: '#1E293B',
                    secondary: '#64748B',
                },
                primary: {
                    contrastText: "#fff",
                    light: "#FFF3D6",
                    100: "#FFE8B3",
                    200: "#FFDC8A",
                    300: "#FFD060",
                    400: "#FFC43F",
                    main: "#FEB537",
                    dark: "#E09D1F",
                    700: "#B87F12",
                },
                secondary: {
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    main: '#6B7280',
                    dark: '#374151',
                },
                divider: '#E2E8F0',
                success: {
                    light: '#E8F5E9',   // Onboarded → light green
                    main: '#10B981',
                },

                info: {
                    light: '#E3F2FD',   // Paid → light blue
                    main: '#0EA5E9',
                },

                warning: {
                    light: '#FFF3E0',   // Promotional → light orange
                    main: '#F59E0B',
                },

                error: {
                    light: '#FDECEA',   // Staffs → light red
                    main: '#DC2626',
                },

            },
        },
        dark: {
            palette: {
                background: {
                    default: '#0F172A',
                    paper: '#1E293B',
                },
                text: {
                    primary: '#F1F5F9',
                    secondary: '#CBD5E1',
                },
                primary: {
                    light: '#1E293B',
                    100: '#312E81',
                    200: '#3730A3',
                    300: '#4338CA',
                    400: '#4F46E5',
                    main: '#6366F1',
                    dark: '#818CF8',
                    700: '#A5B4FC',
                },
                secondary: {
                    100: '#1F2937',
                    200: '#374151',
                    main: '#9CA3AF',
                    dark: '#E5E7EB',
                },
                divider: '#334155',
                success: {
                    light: '#064E3B',
                    main: '#34D399',
                },

                info: {
                    light: '#082F49',
                    main: '#38BDF8',
                },

                warning: {
                    light: '#451A03',
                    main: '#FBBF24',
                },

                error: {
                    light: '#7F1D1D',
                    main: '#EF4444',
                },

            },
        },
    },
    typography: {
        fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
        },
        h2: {
            fontSize: '1.875rem',
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
            letterSpacing: '-0.005em',
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '0.9375rem',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '0.3px',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57,
            letterSpacing: '0.3px',
        },
        button: {
            fontSize: '0.9375rem',
            fontWeight: 500,
            textTransform: 'none',
            letterSpacing: '0.3px',
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.67,
            letterSpacing: '0.3px',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    scrollBehavior: 'smooth',
                },
                body: {
                    backgroundColor: 'var(--mui-palette-background-default)',
                    transition: 'background-color 0.3s ease',
                },
                '*::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                },
                '*::-webkit-scrollbar-track': {
                    backgroundColor: 'var(--mui-palette-background-default)',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: 'var(--mui-palette-primary-main)',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-dark)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: '10px 20px',
                },
                contained: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    },
                },
                outlined: {
                    '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-light)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    border: '1px solid var(--mui-palette-divider)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        borderColor: 'var(--mui-palette-primary-light)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    borderRadius: '12px',
                    border: '1px solid var(--mui-palette-divider)',
                    transition: 'all 0.3s ease',
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
                },
                elevation2: {
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: 'var(--mui-palette-primary-main)',
                        },
                        '&.Mui-focused': {
                            boxShadow: '0 0 0 3px var(--mui-palette-primary-light)',
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--mui-palette-primary-main)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        boxShadow: '0 0 0 3px var(--mui-palette-primary-light)',
                    },
                },
                notchedOutline: {
                    borderColor: 'var(--mui-palette-divider)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: 'var(--mui-palette-background-paper)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: '2px solid var(--mui-palette-divider)',
                    color: 'var(--mui-palette-text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                },
                body: {
                    fontSize: '0.875rem',
                    borderBottom: '1px solid var(--mui-palette-divider)',
                    color: 'var(--mui-palette-text-primary)',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-light)',
                    },
                },
                head: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                },
                filled: {
                    backgroundColor: 'var(--mui-palette-primary-light)',
                    color: 'var(--mui-palette-primary-main)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    margin: '4px 8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-light)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'var(--mui-palette-primary-main)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'var(--mui-palette-primary-dark)',
                        },
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
                    backgroundImage: 'none',
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderBottom: '1px solid var(--mui-palette-divider)',
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    "&.Mui-selected": {
                        color: "#fff",
                        backgroundColor: "var(--mui-palette-primary-main)",
                        "&:hover": {
                            backgroundColor: "var(--mui-palette-primary-dark)",
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '12px',
                    border: '1px solid var(--mui-palette-divider)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    border: '1px solid var(--mui-palette-divider)',
                },
            },
        },
    }
});