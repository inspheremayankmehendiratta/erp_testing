'use client';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';



import { CustomTabs } from '@/modules/shared/components/customtabs';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { Class, Section, ClassSections } from './components/tabs';



const tabs = [
  'Class',
  'Section',
  'Class Section',

];

const ClassSection = () => {
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);


  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Class Section', path: '#' },
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
          title="Class Section"

        />

        {/* ===== Tabs ===== */}
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />

        <Box mt={3}>
          {activeIndex === 0 && <Class />}
          {activeIndex === 1 && <Section />}
          {activeIndex === 2 && <ClassSections />}
        </Box>
      </Box>
    </Box>
  );
};

export default ClassSection;
