
'use client';

import {
  Box,

} from '@mui/material';


import { useRouter } from 'next/navigation';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';




const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Dashboard Running Note', path: '#' },
];

const DashboardRunningNote = () => {
  const router = useRouter();


  return (

    <Box>
      {/* ===== Breadcrumbs & Header ===== */}
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Dashboard Running Note"
          buttonLabel="Create"
          clickHandler={() => router.push(APP_URL.CREATE_SCHOOL)}
        />
      </Box>


    </Box>

  );
};

export default DashboardRunningNote;

