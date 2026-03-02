'use client';


import { useState } from 'react';
import { Box, useTheme } from '@mui/material';


import { CustomTabs } from '@/modules/shared/components/customtabs';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { APP_URL } from '@/modules/shared/config/constants';
import { ConcessionGroup, ConcessionStructuring } from './components/tabs';


const tabs = [
  'Concession Group',
  'Concession Structuring',
];

const FeeConcession = () => {

  const theme = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);

  const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Manage Fee', path: "#" },
    { label: 'Fee Concession', path: "#" },
  ];

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
  };

  return (
    <>
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Fee Concession"
        />
      </Box>

      <Box>
        <CustomTabs
          tabs={tabs}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
          bgColor={theme.palette.background.paper}
        />
        <Box mt={3}>
          {activeIndex === 0 && <ConcessionGroup />}
          {activeIndex === 1 && <ConcessionStructuring />}
        </Box>
      </Box>
    </>
  );
}
export default FeeConcession;



