
'use client';


import ActionButton from "@/modules/shared/ActionButton";
import FileUploader from "@/modules/shared/components/forms/FileUploader";
import { Box, Paper, useTheme } from "@mui/material";
import { ImageIcon, Save } from "lucide-react";
import { useState } from "react";

export const AttendanceImport = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const uploadCount = [logo, favicon].filter(Boolean).length;
  const handleSubmit = () => {
    if (!logo && !favicon) return;
    console.log({ logo, favicon });
  };
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: "1px solid",
          borderColor: theme.palette.divider,
          flex: 1
        }}
      >
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
                label="Import"
                accept="image/*"
                value={logo}
                onChange={setLogo}
                icon={<ImageIcon fontSize="large" color="primary" />}
                helperTitle="Note:" 
                helperText={
                  "Please Follow this sample file and share data accordingly. Also, fields highlighted in yellow are mandatory. Download here.\n" +
                  "Please don't change the heading name mentioned in the sample file.\n" +
                  "There should be no extra space in cells; you can use =trim(text) formula to remove extra spaces."
                }
                bgColor={theme.palette.primary.light}
                tooltipText="Supported: PNG, JPG, SVG, PDF"
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
              label="Submit"
              variant="outlined"
              clickHandler={() => setActiveIndex(4)}
            />



            {/* Save & Next → submits form */}
            <ActionButton
              variant="contained"
              clickHandler={handleSubmit}
              label="Browse"
              type='submit'
              icon={<Save size={16} />}
            />
          </Box>
          {/* Submit */}

        </Box>
      </Paper></>
  );
};

