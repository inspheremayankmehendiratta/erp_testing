'use client';

import { useState } from 'react';
import { AllotmentsPayload } from '../../types/type';

import AcademicCMS from './forms/AcademicCMS';
import Admission from './forms/Admission';
import Fees from './forms/Fees';

import { Save, SkipForward, X } from 'lucide-react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ActionButton from '@/modules/shared/ActionButton';

import Image from 'next/image';
import { CustomAccordian } from '@/modules/shared/components/customaccordian';
import { CustomModal } from '@/modules/shared/components/custommodal';
import { toast } from "react-toastify";

const BasicInfo = ({ setActiveIndex }: any) => {
  const [expanded, setExpanded] = useState<string | false>('academicCMS');
  const [open, setOpen] = useState(false);


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
    data: any,
    isValid: boolean
  ) => {
    setAllotments(prev => ({
      ...prev,
      [section]: data,
    }));

    setSectionValidity(prev => ({
      ...prev,
      [section]: isValid,
    }));
  };

  const handleAccordionChange = (panel: string) => () => {
    // prevent opening locked sections
    if (panel === "admission" && !sectionValidity.academicCMS) return;
    if (panel === "fee" && !sectionValidity.admission) return;

    setExpanded(expanded === panel ? false : panel);
  };

  const handleSaveNext = () => {
  if (
    sectionValidity.academicCMS &&
    sectionValidity.admission &&
    sectionValidity.fee
  ) {
    // ✅ Mock backend response structure
    const response = [
      {
        academicCMS: allotments.academicCMS,
      },
      {
        admission: allotments.admission,
      },
      {
        fee: allotments.fee,
      },
    ];

    console.log("API RESPONSE", response);

    // ✅ Success Toast
    toast.success("Record saved successfully");

    // ✅ Move to next step
    setActiveIndex(2);
  } else {
    toast.error("Please complete all required sections.");
  }
};

  const handleSkip = () => setActiveIndex(2)

  //Track section validity
  const [sectionValidity, setSectionValidity] = useState({
    academicCMS: false,
    admission: false,
    fee: false,
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1,
          px: 3,
          backgroundColor: 'var(--mui-palette-background-default)',
          borderRadius: 2,
          border: '1px solid var(--mui-palette-divider)',
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Do you want to enroll student from registration?
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: 'var(--mui-palette-primary-contrastText)',
            '&:hover': { backgroundColor: 'var(--mui-palette-primary-dark)' },
            textTransform: 'none',
            px: 2,
          }}
        >
          Yes
        </Button>
      </Box>
      <CustomAccordian
        title="General Information"
        expanded={expanded === "academicCMS"}
        onChange={handleAccordionChange("academicCMS")}
      >
        <AcademicCMS
          value={allotments.academicCMS}
          onChange={(data: any, isValid: boolean) =>
            handleChange("academicCMS", data, isValid)
          }
        />
      </CustomAccordian>

      <CustomAccordian
        title="Primary Address"
        expanded={expanded === "admission"}
        onChange={handleAccordionChange("admission")} 
        disabled={!sectionValidity.academicCMS}      
      >
        <Admission
          value={allotments.admission}
          onChange={(data: any, isValid: boolean) =>
            handleChange("admission", data, isValid)
          }
        />
      </CustomAccordian>

      <CustomAccordian
        title="Sibling Detail"
        expanded={expanded === "fee"}
        onChange={handleAccordionChange("fee")}   
        disabled={!sectionValidity.admission}    
      >
        <Fees
          value={allotments.fee}
          onChange={(data: any, isValid: boolean) =>
            handleChange("fee", data, isValid)
          }
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
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Selected Applicants" // Title updated to match image_c38008.png
        width={800}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 10,
            px: 2,
            width: '100%',
            backgroundColor: 'transparent',
          }}
        >
          <Stack spacing={3} alignItems="center">
            {/* Unsplash Illustration */}
            <Box
              sx={{
                width: { xs: 240, md: 320 },
                height: { xs: 180, md: 240 },
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                // Applying a slight grayscale/opacity to match "Empty" state vibes
                filter: 'grayscale(0.5) opacity(0.8)',
              }}
            >
              <Image
                src="/images/files-and-folder.png" // Ensure this path is correct in your public folder
                alt="Select Template Illustration"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>

            {/* Text Section */}
            <Box textAlign="center">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'var(--mui-palette-text-primary)',
                  mb: 1,
                }}
              >
                No Data Found
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default BasicInfo;
