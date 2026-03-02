'use client';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomTabs } from '@/modules/shared/components/customtabs';
import { TransportationCircle, TransportationStops, TransportationRoutes, RoutesStops } from './components/tabs';







const tabs = [
  'Transportation Circle',
  'Transportation Stops',
  'Transportation Routes',
  'Routes Stops',
  'Import'

];

const Transportation = () => {
  const theme = useTheme();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);


  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Transportation', path: '#' },
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
          title="Transportation"

        />

        {/* ===== Tabs ===== */}
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />

        <Box mt={3}>
          {activeIndex === 0 && <TransportationCircle />}
          {activeIndex === 1 && <TransportationStops />}
          {activeIndex === 2 && <TransportationRoutes />}
          {activeIndex === 3 && <RoutesStops />}
        </Box>
      </Box>
    </Box>
  );
};

export default Transportation;
