'use client';

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useFormikContext } from "formik";

import { EmployeePreviousValues } from "../../types/types";
import { designationOptions } from "@/modules/shared/config/config";
import { CustomInput, CustomSelect } from "@/modules/shared/components/forms";

export const EmployeePreviousDetails = () => {

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<EmployeePreviousValues>();

  return (
    <Box>

      <Grid container spacing={3}>

        {/* Smart Card ID */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="smart_card_id"
            name="smart_card_id"
            label="Smart Card ID"
            placeholder="Enter Smart Card Id"
            value={values.smart_card_id}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.smart_card_id}
            error={errors.smart_card_id}
          />
        </Grid>

        {/* Old Employee No */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="old_employee_no"
            name="old_employee_no"
            label="Old Employee No"
            placeholder="Enter Old Employee Number"
            value={values.old_employee_no}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.old_employee_no}
            error={errors.old_employee_no}
          />
        </Grid>

        {/* Previous Designation */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomSelect
            id="prev_designation"
            name="prev_designation"
            label="Prev Designation"
            value={values.prev_designation}
            options={designationOptions}
            placeholder="Select Designation"
            touched={touched.prev_designation}
            error={errors.prev_designation}
            onChange={(e) =>
              setFieldValue("prev_designation", e.target.value)
            }
          />
        </Grid>

        {/* Employer Remark */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="employer_remark"
            name="employer_remark"
            label="Employer Remark"
            placeholder="Enter Employer Remark"
            value={values.employer_remark}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.employer_remark}
            error={errors.employer_remark}
          />
        </Grid>

        {/* Leave Remark */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="leave_remark"
            name="leave_remark"
            label="Leave Remark"
            placeholder="Enter Leave Remark"
            value={values.leave_remark}
            onChange={handleChange}
          />

          <Typography variant="caption" color="text.secondary">
            Note: Remark here for employee leave.
          </Typography>
        </Grid>

        {/* Previous Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput
            id="previous_details"
            name="previous_details"
            label="Previous Details"
            placeholder="Enter Previous Details"
            value={values.previous_details}
            onChange={handleChange}
          />
        </Grid>

      </Grid>

    </Box>
  );
};