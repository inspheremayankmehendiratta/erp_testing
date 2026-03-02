'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AllotmentsPayload } from '../../types/type';

import AcademicCMS from './forms/AcademicCMS';
import Admission from './forms/Admission';
import Fees from './forms/Fees';

import { Save, SkipForward, X } from 'lucide-react';
import { Box, Stack, Typography } from '@mui/material';
import { CustomAccordian } from '@/modules/shared/components/customaccordian';
import ActionButton from '@/modules/shared/ActionButton';




const PersonalInfo = ({ setActiveIndex }: any) => {
  const [expanded, setExpanded] = useState<string | false>('');

  const [allotments, setAllotments] = useState<AllotmentsPayload>({
    academicCMS: {},
    admission: {},
    fee: {},
    idCard: {},
    lessonPlanning: {},
    library: {},
    mailService: {},
    payroll: {},
  });

  const handleChange = (
    section: keyof AllotmentsPayload,
    data: Record<string, boolean>
  ) => {
    setAllotments(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleAccordionChange = (panel: string) => () => {
    setExpanded(expanded === panel ? false : panel);
  };

  const handleSaveNext = () => {
    console.log('FINAL ALLOTMENTS PAYLOAD', allotments);
    setActiveIndex(2)

    // 👉 API call
    // saveAllotments(allotments);

    // 👉 move to next tab (Payment Type)
  };

  const handleSkip = () => setActiveIndex(2)

  return (
    <>

      <CustomAccordian
        title="Personal Information"
        expanded={expanded === 'academicCMS'}
        onChange={handleAccordionChange('academicCMS')}
      >
        <AcademicCMS
          value={allotments.academicCMS}
          onChange={(data:any) => handleChange('academicCMS', data)}
        />
      </CustomAccordian>

      <CustomAccordian
        title="Physical Details"
        expanded={expanded === 'admission'}
        onChange={handleAccordionChange('admission')}
      >
        <Admission />
      </CustomAccordian>

      <CustomAccordian
        title="Other Information"
        expanded={expanded === 'fee'}
        onChange={handleAccordionChange('fee')}
      >
        <Fees
          value={allotments.fee}
          onChange={(data:any) => handleChange('fee', data)}
        />
      </CustomAccordian>
      <CustomAccordian
        title="Correspondence Address"
        expanded={expanded === 'fee'}
        onChange={handleAccordionChange('fee')}
      >
        <Fees
          value={allotments.fee}
          onChange={(data:any) => handleChange('fee', data)}
        />
      </CustomAccordian>

      <Box
        display="flex"
        justifyContent="flex-end"
        gap={1}
        flexWrap="wrap"
        mt={2}
      >
        {/* Skip */}
        <ActionButton
          label="Skip"
          variant="outlined"
          icon={<SkipForward size={16} />}
          clickHandler={() =>
            setActiveIndex(2)
          }
        />
        {/* Cancel */}
        <ActionButton
          label="Cancel"
          variant="outlined"
          icon={<X size={16} />}
          clickHandler={() => setActiveIndex(1)}
        />



        {/* Save & Next → submits form */}
        <ActionButton
          label="Save & Next"
          type="submit"
          variant="contained"
          icon={<Save size={16} />}
          clickHandler={handleSaveNext}
        />

      </Box>

    </>
  );
};

export default PersonalInfo;
