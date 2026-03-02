'use client';

import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { APP_URL } from '@/modules/shared/config/constants';
import {
  Box,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';





const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Admission', path: '#' },
  { label: 'Struck Off & Withdrawal', path: '#' },
];

const StruckoffWhithdrawal = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box>
      {/* ===== Breadcrumbs & Header ===== */}
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Struck Off & Withdrawal"
          buttonLabel="Create"
          clickHandler={() => router.push(APP_URL.CREATE_SCHOOL)}
        />
      </Box>

    </Box>
  );
};

export default StruckoffWhithdrawal;
