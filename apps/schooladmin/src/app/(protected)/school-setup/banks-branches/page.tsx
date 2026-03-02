'use client';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { CustomTabs } from '@/modules/shared/components/customtabs';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { ManageBank, ManageBraches } from './components/tabs';

const tabs = [
  'Manage Bank',
  'Manage Braches',

];

const BankBranches = () => {
  const theme = useTheme();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);


  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Banks & Branches', path: '#' },
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
          title="Banks & Branches"
        />

        {/* ===== Tabs ===== */}
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />

        <Box mt={3}>
          {activeIndex === 0 && <ManageBank />}
          {activeIndex === 1 && <ManageBraches />}
        </Box>
      </Box>
    </Box>
  );
};

export default BankBranches;
