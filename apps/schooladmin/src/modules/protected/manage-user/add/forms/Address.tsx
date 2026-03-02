'use client';

import React from "react";
import { Grid, Box } from "@mui/material";
import { useFormikContext } from "formik";


import { AddressDetailValues} from "../../types/types";
import {
  stateOptions,
  routeOptions,
  stopOptions
} from "@/modules/shared/config/config";
import { CustomInput, CustomSelect } from "@/modules/shared/components/forms";

export const Address = () => {

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<AddressDetailValues>();

  return (
    <Box>

      <Grid container spacing={3}>

        {/* House No */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="house_no"
            name="house_no"
            label="House No"
            placeholder="Enter House No"
            value={values.house_no}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.house_no}
            error={errors.house_no}
          />
        </Grid>

        {/* Area */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="area"
            name="area"
            label="Area"
            placeholder="Enter Area"
            value={values.area}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.area}
            error={errors.area}
          />
        </Grid>

        {/* Street */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="street"
            name="street"
            label="Street"
            placeholder="Enter Street"
            value={values.street}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.street}
            error={errors.street}
          />
        </Grid>

        {/* City */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="city"
            name="city"
            label="City"
            placeholder="Enter City"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.city}
            error={errors.city}
          />
        </Grid>

        {/* District */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="district"
            name="district"
            label="District"
            placeholder="Enter District"
            value={values.district}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.district}
            error={errors.district}
          />
        </Grid>

        {/* Landmark */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="landmark"
            name="landmark"
            label="Landmark"
            placeholder="Enter Landmark"
            value={values.landmark}
            onChange={handleChange}
          />
        </Grid>

        {/* Nearest Police Station */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="nearest_police_station"
            name="nearest_police_station"
            label="Nearest Police Station"
            placeholder="Enter Police Station"
            value={values.nearest_police_station}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.nearest_police_station}
            error={errors.nearest_police_station}
          />
        </Grid>

        {/* Pin Code */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="pincode"
            name="pincode"
            label="Pin Code"
            placeholder="Enter Pin Code"
            value={values.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.pincode}
            error={errors.pincode}
          />
        </Grid>

        {/* State */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="state"
            name="state"
            label="State"
            value={values.state}
            options={stateOptions}
            placeholder="Select State"
            touched={touched.state}
            error={errors.state}
            onChange={(e) =>
              setFieldValue("state", e.target.value)
            }
          />
        </Grid>

        {/* Phone 1 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="phone1"
            name="phone1"
            label="Phone 1 (Optional)"
            placeholder="Enter Phone Number"
            value={values.phone1}
            onChange={handleChange}

          />
        </Grid>

        {/* Phone 2 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomInput
            id="phone2"
            name="phone2"
            label="Phone 2 (Optional)"
            placeholder="Enter Phone Number"
            value={values.phone2}
            onChange={handleChange}
          />
        </Grid>

        {/* Route */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="route"
            name="route"
            label="Route"
            value={values.route}
            options={routeOptions}
            placeholder="Select Route"
            onChange={(e) =>
              setFieldValue("route", e.target.value)
            }
          />
        </Grid>

        {/* Stop */}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomSelect
            id="stop"
            name="stop"
            label="Stop"
            value={values.stop}
            options={stopOptions}
            placeholder="Select Stop"
            touched={touched.stop}
            error={errors.stop}
            onChange={(e) =>
              setFieldValue("stop", e.target.value)
            }
          />
        </Grid>

      </Grid>

    </Box>
  );
};