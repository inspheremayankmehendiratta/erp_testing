'use client';

import {
  Box,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomTabs } from '@/modules/shared/components/customtabs';



const tabs = [
  'Student Disciplinary Info',
  'Student Infirmary',
  'Student Participation Info',
];




const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Admission', path: '#' },
  { label: 'Activity', path: '#' },
];

const Activity = () => {
  const theme = useTheme();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };


  return (
    <Box>
      {/* ===== Breadcrumbs & Header ===== */}
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Activity"
        />
      </Box>
      <Box>
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />

        {/* <Box mt={3}>
          {activeIndex === 0 && <StudentDisciplinary setActiveIndex={setActiveIndex} />}
          {activeIndex === 1 && <div><StudentInfirmary setActiveIndex={setActiveIndex} /></div>}
          {activeIndex === 2 && <div><StudentParticipation setActiveIndex={setActiveIndex} /></div>}
        </Box> */}
      </Box>

    </Box>
  );
};

export default Activity;
