'use client';

import { Box, Container, Typography, useTheme, Link } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        py: 3,
        mt: 8,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth={false} >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* Left Section */}
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            © {currentYear} School ERP. All rights reserved.
          </Typography>

          {/* Right Section - Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Link
              href="#"
              underline="none"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Privacy Policy
            </Link>
            <Typography
              sx={{
                color: theme.palette.divider,
              }}
            >
              |
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Terms of Service
            </Link>
            <Typography
              sx={{
                color: theme.palette.divider,
              }}
            >
              |
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;