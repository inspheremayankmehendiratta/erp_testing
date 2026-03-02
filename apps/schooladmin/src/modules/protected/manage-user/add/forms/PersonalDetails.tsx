'use client';

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useFormikContext } from "formik";

import { PersonalDetailValues } from "../../types/types";


import { CustomInput, CustomSelect } from "@/modules/shared/components/forms";
import { bloodGroupOptions, casteOptions, experienceOptions, maritalStatusOptions, religionOptions } from "@/modules/shared/config/config";

export const PersonalDetails = () => {

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<PersonalDetailValues>();

  return (
    <Box>

      <Grid container spacing={3}>

        {/* Date Of Birth */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="dob"
            name="dob"
            label="Date Of Birth"
            type="date"
            value={values.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.dob}
            error={errors.dob}
          />
        </Grid>

        {/* Experience */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="experience"
            name="experience"
            label="Experience"
            value={values.experience}
            options={experienceOptions}
            placeholder="Select Experience"
            touched={touched.experience}
            error={errors.experience}
            onChange={(e) => setFieldValue("experience", e.target.value)}
          />
        </Grid>

        {/* Father Name */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="father_name"
            name="father_name"
            label="Father Name"
            placeholder="Enter Father Name"
            value={values.father_name}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.father_name}
            error={errors.father_name}
          />
        </Grid>

        {/* Marital Status */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="marital_status"
            name="marital_status"
            label="Marital Status"
            value={values.marital_status}
            options={maritalStatusOptions}
            placeholder="Select Marital Status"
            touched={touched.marital_status}
            error={errors.marital_status}
            onChange={(e) => setFieldValue("marital_status", e.target.value)}
          />
        </Grid>

        {/* No Of Dependant */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="dependants"
            name="dependants"
            label="No Of Dependant"
            placeholder="Enter Dependants"
            value={values.dependants}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.dependants}
            error={errors.dependants}
          />

          <Typography variant="caption" color="text.secondary">
            Note: who depends on you for financial support.
          </Typography>
        </Grid>

        {/* Religion */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="religion"
            name="religion"
            label="Religion"
            value={values.religion}
            options={religionOptions}
            placeholder="Select Religion"
            touched={touched.religion}
            error={errors.religion}
            onChange={(e) => setFieldValue("religion", e.target.value)}
          />
        </Grid>

        {/* Caste */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="caste"
            name="caste"
            label="Caste"
            value={values.caste}
            options={casteOptions}
            placeholder="Select Caste"
            touched={touched.caste}
            error={errors.caste}
            onChange={(e) => setFieldValue("caste", e.target.value)}
          />
        </Grid>

        {/* Blood Group */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="blood_group"
            name="blood_group"
            label="Blood Group"
            value={values.blood_group}
            options={bloodGroupOptions}
            placeholder="Select Blood Group"
            touched={touched.blood_group}
            error={errors.blood_group}
            onChange={(e) => setFieldValue("blood_group", e.target.value)}
          />
        </Grid>

        {/* Height */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="height"
            name="height"
            label="Height (CM)"
            placeholder="Enter Height"
            value={values.height}
            onChange={handleChange}
          />
        </Grid>

        {/* Weight */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="weight"
            name="weight"
            label="Weight (KG)"
            placeholder="Enter Weight"
            value={values.weight}
            onChange={handleChange}
          />
        </Grid>

        {/* ID Mark */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="id_mark"
            name="id_mark"
            label="ID Mark"
            placeholder="Enter Identification Mark"
            value={values.id_mark}
            onChange={handleChange}
          />
        </Grid>

        {/* Physical Disability */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="physical_disability"
            name="physical_disability"
            label="Phy. Disability"
            placeholder="Enter Disability (if any)"
            value={values.physical_disability}
            onChange={handleChange}
          />
        </Grid>

        {/* Health Remark */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="health_remark"
            name="health_remark"
            label="Health Remark"
            placeholder="Enter Health Remark"
            value={values.health_remark}
            onChange={handleChange}
          />
        </Grid>

      </Grid>

    </Box>
  );
};