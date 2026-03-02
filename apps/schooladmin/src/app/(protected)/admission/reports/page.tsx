'use client';

import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Bus,
  House,
  Tag,
  UserSearch,
  ScrollText,
  Ellipsis,
  LogOut,
} from 'lucide-react';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomCard } from '@/modules/shared/components/customcard';



const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Admission', path: '#' },
  { label: 'Reports', path: '#' },
];
const Reports = () => {
  const router = useRouter();

  // ---------- Cards Data ----------
  const REPORT_CARDS = [
    {
      title: 'Student Report',
      icon: GraduationCap,
      path: APP_URL.ADMISSION_REPORTS,
    },
    {
      title: 'Transport Reports',
      icon: Bus,
      path: APP_URL.ADMISSION_TRANSPORT_REPORT,
    },
    {
      title: 'Hostel Reports',
      icon: House,
      path: APP_URL.ADMISSION_HOSTAL_REPORT,
    },
    {
      title: 'Concession Reports',
      icon: Tag,
      path: APP_URL.ADMISSION_CONCESSION_REPORT,
    },
    {
      title: 'Student Search Report',
      icon: UserSearch,
      path: APP_URL.ADMISSION_STUDENT_SEARCH_REPORT,
    },
    {
      title: 'Student Document Report',
      icon: ScrollText,
      path: APP_URL.ADMISSION_STUDENT_DOCUMENT_REPORT,
    },
    {
      title: 'Other Reports',
      icon: Ellipsis,
      path: APP_URL.ADMISSION_OTHER_REPORT,
    },
    {
      title: 'Student Leaving Report',
      icon: LogOut,
     path: APP_URL.ADMISSION_LEAVING_REPORT,
    },
  ];


  return (
    <>
      <Box>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Report"

        />
      </Box>
      <Box>

        {/* ===== Container Card ===== */}
        <CustomCard>

          {/* ===== Grid ===== */}
          <Grid container spacing={6}>

            {REPORT_CARDS.map((card, index) => {
              const Icon = card.icon;

              return (
                <Grid
                  key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}
                // 5 in one row
                >
                  <Box
                    onClick={() => router.push(card.path)}
                    sx={{
                      cursor: 'pointer',
                      textAlign: 'center',
                      p: 2,
                      borderRadius: '16px',
                      transition: '0.3s',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow:
                          '0 10px 24px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Stack alignItems="center" spacing={2}>

                      {/* ===== Icon Circle ===== */}
                      <Box
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: '50%',
                          background:
                            'linear-gradient(135deg,#FFD54F,#F4B400)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow:
                            '0 4px 12px rgba(0,0,0,0.18)',
                        }}
                      >
                        <Icon
                          size={38}
                          color="#1A1A1A"
                        />
                      </Box>

                      {/* ===== Title ===== */}
                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        color="text.primary"
                      >
                        {card.title}
                      </Typography>

                    </Stack>
                  </Box>
                </Grid>
              );
            })}

          </Grid>
        </CustomCard>

      </Box>
    </>
  );
};

export default Reports;
