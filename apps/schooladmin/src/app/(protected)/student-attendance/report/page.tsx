'use client';

import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  BarChart3,
  FileBarChart2,
} from 'lucide-react';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomCard } from '@/modules/shared/components/customcard';



const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Student Attendance', path: '#' },
  { label: 'Report', path: '#' },
];
const Report = () => {
  const router = useRouter();

  // ---------- Cards Data ----------
  const REPORT_CARDS = [
    {
      title: 'Consolidated Report',
      icon: BookOpen,
      path: APP_URL.STUDENT_ATTENDANCE_REPORT_CONSOLIDATED,
    },
    {
      title: 'Attendance Sheet',
      icon: ClipboardList,
      path: APP_URL.STUDENT_ATTENDANCE_REPORT_ATTENDANCE_SHEET,
    },
    {
      title: 'Attendance Summary',
      icon: FileBarChart2,
      path: APP_URL.STUDENT_ATTENDANCE_REPORT_ATTENDANCE_SUMMARY,
    },
    {
      title: 'Overall Summary',
      icon: LayoutDashboard,
      path: APP_URL.STUDENT_ATTENDANCE_REPORT_OVERALL_SUMMARY,
    },
    {
      title: 'Daily Attendance Sheet',
      icon: BarChart3,
      path:APP_URL.STUDENT_ATTENDANCE_REPORT_DAILY_ATTENDANCE_SHEET,
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

export default Report;
