'use client';

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';

import { ImageIcon, Save, UploadCloud, X } from 'lucide-react';
import FileUploader from '@/modules/shared/components/forms/FileUploader';
import ActionButton from '@/modules/shared/ActionButton';

const OfficalInfo = ({ setActiveIndex }: any) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const theme = useTheme();

  const handleSubmit = () => {
    if (!logo && !favicon) return;
    console.log({ logo, favicon });
  };

  const uploadCount = [logo, favicon].filter(Boolean).length;

  return (
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
      }}
    >
      {/* Upload Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: '1fr 1fr',
          },
          gap: 2,
          justifyItems: uploadCount === 1 ? { md: 'center' } : 'stretch',
        }}
      >
        {/* Logo Upload */}
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '100%',
              md: uploadCount === 1 ? '50%' : '100%',
            },
          }}
        >
          <FileUploader
            id="company-logo"
            name="logo"
            label="School Logo"
            accept="image/*"
            value={logo}
            onChange={setLogo}
            icon={<ImageIcon fontSize="large" color="primary" />}
            helperText={"Please upload an image file (logo, favicon, etc.) with maximum size 100KB"}
            bgColor={theme.palette.primary.light}
            tooltipText="Supported: PNG, JPG, SVG"
          />



        </Box>

        {/* Favicon Upload */}
        <Box width="100%">
          <FileUploader
            id="company-favicon"
            name="favicon"
            label="Favicon"
            accept="image/*"
            value={favicon}
            onChange={setFavicon}
            icon={<UploadCloud fontSize="large" color="secondary" />}
            helperText={"Please upload an image file (logo, favicon, etc.) with maximum size 100KB"}
            bgColor={theme.palette.primary.light}
            tooltipText="Supported: PNG, JPG, SVG"

          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={1}
        flexWrap="wrap"
        mt={2}
      >

        <ActionButton
          label="Cancel"
          variant="outlined"
          icon={<X size={16} />}
          clickHandler={() => setActiveIndex(4)}
        />



        {/* Save & Next → submits form */}
        <ActionButton
          variant="contained"
          clickHandler={handleSubmit}
          label="Save"
          type='submit'
          icon={<Save size={16} />}
        />
      </Box>
      {/* Submit */}

    </Box>
  );
};

export default OfficalInfo;
