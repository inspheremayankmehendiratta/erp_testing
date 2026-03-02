'use client';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';



import { CustomTabs } from '@/modules/shared/components/customtabs';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { HostelBlock, HostelRoomType, HostelRoom } from './components/tabs';



const tabs = [
  'Hostel Block',
  'Hostel Room Type',
  'Hostel Room',
];

const ManageHostel = () => {
  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);


  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Manage Hostels', path: '#' },
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
          title="Manage Hostels"

        />

        {/* ===== Tabs ===== */}
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />

        <Box mt={3}>
          {activeIndex === 0 && <HostelBlock />}
          {activeIndex === 1 && <HostelRoomType />}
          {activeIndex === 2 && <HostelRoom />}
        </Box>
      </Box>
    </Box>
  );
};

export default ManageHostel;
