'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  maxItems?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items = [], 
  showHome = true,
  maxItems = 8
}) => {
  const theme = useTheme();
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items.length > 0) {
      return items;
    }

    const paths = pathname.split('/').filter((p) => p);
    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        path: '/',
        icon: <Home size={16} />,
      });
    }

    paths.forEach((path, index) => {
      const routePath = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({
        label,
        path: routePath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs().slice(0, maxItems);

  return (
    <Box
      sx={{
        py: 1,
        px: 0,
        background: 'transparent',
      }}
    >
      <MuiBreadcrumbs
        separator={
          <ChevronRight
            size={16}
            style={{
              color: theme.palette.text.secondary,
              margin: '0 4px',
            }}
          />
        }
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center',
          },
        }}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {item.icon && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isLast ? theme.palette.primary.main : theme.palette.text.secondary,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.icon}
                </Box>
              )}
              {isLast ? (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem',
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.label}
                </Typography>
              ) : (
                <Link
                  href={item.path || '/'}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.875rem',
                      color: theme.palette.text.secondary,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                      letterSpacing: '0.3px',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              )}
            </Box>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
