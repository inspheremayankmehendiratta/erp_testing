'use client';

import React from "react";
import { Grid, Box, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useFormikContext } from "formik";

import { PermissionFormValues } from "../../types/types";

import {
  moduleOptions,
  subModuleOptions,
  classOptions,
  sectionOptions,
  subjectOptions
} from "@/modules/shared/config/config";

import { CustomSelect } from "@/modules/shared/components/forms";

export const PermissionForm = () => {

  const {
    values,
    errors,
    touched,
    setFieldValue
  } = useFormikContext<PermissionFormValues>();

  return (
    <Box>

      <Grid container spacing={3}>

        {/* Module */}
        <Grid size={{ xs: 12 }}>
          <CustomSelect
            id="module"
            name="module"
            label="Select Module *"
            value={values.module}
            options={moduleOptions}
            placeholder="Select Module"
            touched={touched.module}
            error={errors.module}
            onChange={(e) => setFieldValue("module", e.target.value)}
          />
        </Grid>

        {/* Sub Modules */}
        <Grid size={{ xs: 12 }}>
          <CustomSelect
            id="sub_module"
            name="sub_module"
            label="Select Sub Modules *"
            value={values.sub_module}
            options={subModuleOptions}
            placeholder="Select Sub Modules"
            touched={touched.sub_module}
            error={errors.sub_module}
            onChange={(e) => setFieldValue("sub_module", e.target.value)}
          />
        </Grid>

        {/* Classes */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomSelect
            id="class"
            name="class"
            label="Select Classes"
            value={values.class}
            options={classOptions}
            placeholder="Select Classes"
            onChange={(e) => setFieldValue("class", e.target.value)}
          />
        </Grid>

        {/* Sections */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomSelect
            id="section"
            name="section"
            label="Select Sections"
            value={values.section}
            options={sectionOptions}
            placeholder="Select Sections"
            onChange={(e) => setFieldValue("section", e.target.value)}
          />
        </Grid>

        {/* Subjects */}
        <Grid size={{ xs: 12 }}>
          <CustomSelect
            id="subject"
            name="subject"
            label="Select Subjects"
            value={values.subject}
            options={subjectOptions}
            placeholder="Select Subjects"
            onChange={(e) => setFieldValue("subject", e.target.value)}
          />
        </Grid>

        {/* Permissions */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              background: "#f4f6f8",
              borderRadius: 2,
              padding: 2
            }}
          >
            <Typography fontSize={14} mb={1}>
              Select Permissions*
            </Typography>

            <RadioGroup
              row
              value={values.permission}
              onChange={(e) => setFieldValue("permission", e.target.value)}
            >
              <FormControlLabel value="view" control={<Radio />} label="VIEW" />
              <FormControlLabel value="add" control={<Radio />} label="ADD" />
              <FormControlLabel value="edit" control={<Radio />} label="EDIT" />
              <FormControlLabel value="delete" control={<Radio />} label="DELETE" />
            </RadioGroup>
          </Box>
        </Grid>

      </Grid>

    </Box>
  );
};