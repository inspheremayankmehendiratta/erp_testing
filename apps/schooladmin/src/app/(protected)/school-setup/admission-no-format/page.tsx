"use client";

import {useState } from "react";

import {

  Box,

  useTheme,

} from "@mui/material";


import { APP_URL } from "@/modules/shared/config/constants";
import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";


const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Admission No Format', path: '#' },
];

const AdmissionNoFormat = () => {


  const handleCreate = () => {

  }

  return (
    <>
      <Box>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="Admission No Format"
          buttonLabel="Edit Serial No. Counter"
          clickHandler={() => handleCreate()}

        />
      </Box>

    </>
  );
};

export default AdmissionNoFormat;