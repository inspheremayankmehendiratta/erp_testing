'use client';

import { Grid, Box } from "@mui/material";
import { useFormikContext } from "formik";

import { BasicDetailValues } from "../../types/types";
import { departmentOptions, designationOptions, employmentTypeOptions, genderOptions, qualificationOptions, teachingOptions, wingOptions, workingStatusOptions } from "@/modules/shared/config/config";
import { CustomDatePicker, CustomInput, CustomSelect, CutomFormFileUpload } from "@/modules/shared/components/forms";

export const BasicDetail = () => {

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
    } = useFormikContext<BasicDetailValues>();

    return (
        <Box>

            <Grid container spacing={3}>

                {/* Employee No */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomInput
                        id="employee_no"
                        name="employee_no"
                        label="Employee No."
                        placeholder="Enter Employee No."
                        value={values.employee_no}
                        onChange={handleChange} />
                </Grid>

                {/* First Name */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomInput
                        id="first_name"
                        name="first_name"
                        label="First Name"
                        placeholder="Enter First Name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.first_name}
                        error={errors.first_name}
                        required
                    />
                </Grid>

                {/* Middle Name */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomInput
                        id="middle_name"
                        name="middle_name"
                        label="Middle Name"
                        placeholder="Enter Middle Name"
                        value={values.middle_name}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Last Name */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomInput
                        id="last_name"
                        name="last_name"
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={values.last_name}
                        onChange={handleChange}
                    />
                </Grid>

                {/* Mobile */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomInput
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        placeholder="Enter Mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.mobile}
                        error={errors.mobile}
                        required
                    />
                </Grid>

                {/* Email */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomInput
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Enter Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        touched={touched.email}
                        error={errors.email}
                        required
                    />
                </Grid>

                {/* Gender */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="gender"
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        options={genderOptions}
                        placeholder="Select gender"
                        required
                        touched={touched.gender}
                        error={errors.gender}
                        onChange={(e) =>
                            setFieldValue("gender", e.target.value)
                        }
                    />
                </Grid>

                {/* Qualification */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="qualification"
                        name="qualification"
                        label="Qualification"
                        value={values.qualification}
                        options={qualificationOptions}
                        placeholder="Select qualification"
                        required
                        touched={touched.qualification}
                        error={errors.qualification}
                        onChange={(e) =>
                            setFieldValue("qualification", e.target.value)
                        }
                    />
                </Grid>

                {/* Wing */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="wing"
                        name="wing"
                        label="Wing"
                        value={values.wing}
                        options={wingOptions}
                        placeholder="Select wing"
                        required
                        touched={touched.wing}
                        error={errors.wing}
                        onChange={(e) =>
                            setFieldValue("wing", e.target.value)
                        }
                    />
                </Grid>

                {/* Designation */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="designation"
                        name="designation"
                        label="Designation"
                        value={values.designation}
                        options={designationOptions}
                        placeholder="Select designation"
                        required
                        touched={touched.designation}
                        error={errors.designation}
                        onChange={(e) =>
                            setFieldValue("designation", e.target.value)
                        }
                    />
                </Grid>

                {/* Working Status */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="working_status"
                        name="working_status"
                        label="Working Status"
                        value={values.working_status}
                        options={workingStatusOptions}
                        placeholder="Select working status"
                        required
                        touched={touched.working_status}
                        error={errors.working_status}
                        onChange={(e) =>
                            setFieldValue("working_status", e.target.value)
                        }
                    />
                </Grid>

                {/* Employment Type */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="employment_type"
                        name="employment_type"
                        label="Employment Type"
                        value={values.employment_type}
                        options={employmentTypeOptions}
                        placeholder="Select employment type"
                        required
                        touched={touched.employment_type}
                        error={errors.employment_type}
                        onChange={(e) =>
                            setFieldValue("employment_type", e.target.value)
                        }
                    />
                </Grid>

                {/* Department */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="department"
                        name="department"
                        label="Department"
                        value={values.department}
                        options={departmentOptions}
                        placeholder="Select department"
                        required
                        touched={touched.department}
                        error={errors.department}
                        onChange={(e) =>
                            setFieldValue("department", e.target.value)
                        }
                    />
                </Grid>

                {/* Teaching */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomSelect
                        id="teaching"
                        name="teaching"
                        label="Teaching"
                        value={values.teaching}
                        options={teachingOptions}
                        placeholder="Select teaching type"
                        required
                        touched={touched.teaching}
                        error={errors.teaching}
                        onChange={(e) =>
                            setFieldValue("teaching", e.target.value)
                        }
                    />
                </Grid>

                {/* Joining Date */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CustomDatePicker
                        id="joining_date"
                        name="joining_date"
                        label="Joining Date"
                    />
                </Grid>

                {/* Upload Photo */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CutomFormFileUpload
                        label="Upload Photo"
                        accept="image/*"
                        maxSizeMB={2}
                        helperText="Upload image max 2MB"
                        file={values.photo}
                        onChange={(file) =>
                            setFieldValue("photo", file)
                        }
                    />
                </Grid>

                {/* Upload Signature */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <CutomFormFileUpload
                        label="Upload Signature"
                        accept="image/*"
                        maxSizeMB={2}
                        helperText="Upload image max 2MB"
                        file={values.signature}
                        onChange={(file) =>
                            setFieldValue("signature", file)
                        }
                    />
                </Grid>

            </Grid>

        </Box>
    );
};