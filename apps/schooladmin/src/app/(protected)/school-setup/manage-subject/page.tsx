'use client';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';



import { CustomTabs } from '@/modules/shared/components/customtabs';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { Subject, ClassSectionSubject } from './components/tabs';



const tabs = [
  'Subject',
  'Class Section Subject',
];

const ManageSubject = () => {
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);


  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Manage Subjects', path: '#' },
  ];

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box>
      {/* ===== Breadcrumbs & Header ===== */}
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Manage Subjects"

        />

        {/* ===== Tabs ===== */}
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />

        <Box mt={3}>
          {activeIndex === 0 && <Subject />}
          {activeIndex === 1 && <ClassSectionSubject />}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageSubject;
