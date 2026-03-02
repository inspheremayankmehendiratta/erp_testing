'use client';

import React, { useState, useRef } from 'react';
import { Box, Grid, Container, Button, Stack } from '@mui/material';
import { Formik, Form } from 'formik';





import { ArrowLeft, HomeIcon, PersonStandingIcon } from 'lucide-react';
import { BasicDetail } from '@/modules/protected/manage-user/add/forms/BasicDetail';
import { step1ValidationSchema, permissionValidationSchema } from '@/modules/protected/manage-user/add/forms/ValidationSchemas';
import { CustomStepper } from '@/modules/shared/components/customstepper';
import ActionButton from '@/modules/shared/ActionButton';
import { Address } from '@/modules/protected/manage-user/add/forms/Address';
import { useRouter } from 'next/navigation';
import { APP_URL } from '@/modules/shared/config/constants';
import { PersonalDetails } from '@/modules/protected/manage-user/add/forms/PersonalDetails';
import { EmployeePreviousDetails } from '@/modules/protected/manage-user/add/forms/EmployeePreviousDetails ';
import { PermissionForm } from '@/modules/protected/manage-user/add/forms/PermissionForm';
import {
  BasicDetailValues,
  AddressDetailValues,
  PersonalDetailValues,
  EmployeePreviousValues,
  PermissionFormValues,
} from '@/modules/protected/manage-user/types/types';


// ================= STEPS =================
const steps = [
  { label: 'Basic', icon: <PersonStandingIcon size={18} /> },
  { label: 'Address', icon: <HomeIcon size={18} /> },
  { label: 'Personal', icon: <HomeIcon size={18} /> },
  { label: 'Other', icon: <HomeIcon size={18} /> },
  { label: 'Permissions', icon: <HomeIcon size={18} /> },
];

// ================= INITIAL VALUES =================
// compose a single object type containing all step value interfaces

const initialValues: BasicDetailValues &
  AddressDetailValues &
  PersonalDetailValues &
  EmployeePreviousValues &
  PermissionFormValues = {
  // basic
  employee_no: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  mobile: 0,
  email: "",
  gender: 0,
  qualification: 0,
  wing: 0,
  designation: 0,
  working_status: 0,
  employment_type: 0,
  department: 0,
  teaching: 0,
  photo: null,
  signature: null,
  // address
  house_no: 0,
  area: "",
  street: "",
  city: "",
  district: 0,
  landmark: "",
  nearest_police_station: "",
  pincode: 0,
  state: 0,
  phone1: 0,
  phone2: 0,
  route: 0,
  stop: 0,
  // personal
  dob: "",
  experience: "",
  father_name: "",
  marital_status: "",
  dependants: "",
  religion: "",
  caste: "",
  blood_group: "",
  height: "",
  weight: "",
  id_mark: "",
  physical_disability: "",
  health_remark: "",
  // previous
  smart_card_id: "",
  old_employee_no: "",
  prev_designation: "",
  employer_remark: "",
  leave_remark: "",
  previous_details: "",
  // permissions
  module: "",
  sub_module: "",
  class: "",
  section: "",
  subject: "",
  permission: "view",
};

const Add = () => {

  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () =>
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

  // ================= STEP VALIDATION PICKER =================
  const getValidationSchema = () => {
    switch (activeStep) {
      case 0:
        return step1ValidationSchema;
      case 4:
        return permissionValidationSchema;
      default:
        return undefined;
    }
  };

  // ================= STEP CONTENT =================
  const renderStepForm = () => {
    switch (activeStep) {
      case 0:
        return <BasicDetail />;
      case 1:
        return <Address />;
      case 2:
        return <PersonalDetails />;
      case 3:
        return <EmployeePreviousDetails />;
      case 4:
        return <PermissionForm />;
      default:
        return null;
    }
  };

  const handelBack = () => {
    scrollToTop();
    if (activeStep === 0) {
      router.push(APP_URL.MANAGE_USER)
    } else {
      setActiveStep((prev) => prev - 1);

    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={(values) => {
        console.log("FINAL SUBMIT", values);
        router.push(APP_URL.MANAGE_USER)
      }}
      enableReinitialize
    >
      {({ validateForm, handleSubmit, setTouched, errors }) => (

        <Form>

          <Grid container sx={{ my: 2 }} ref={formRef}>
            <Grid size={{ xs: 12 }}>
              <Container maxWidth="xl">

                {/* ===== STEPPER ===== */}
                <Box sx={{ my: 4 }}>
                  <CustomStepper
                    activeStep={activeStep}
                    steps={steps}
                    completedSteps={completedSteps}
                    onStepClick={(i) => {
                      setActiveStep(i);
                      scrollToTop();
                    }}
                  />
                </Box>

                {/* ===== STEP FORM ===== */}
                <Box>{renderStepForm()}</Box>

                {/* ===== NAV BUTTONS ===== */}
                <Stack
                  direction="row"
                  gap={3}
                  justifyContent='flex-end'
                  mt={4}
                >

                  <ActionButton
                    label={"Back"}
                    variant='outlined'
                    icon={<ArrowLeft size={16} />}
                    clickHandler={() => {
                      handelBack()
                    }}                                  >

                  </ActionButton>

                  <ActionButton
                    variant="contained"
                    clickHandler={async () => {

                      const errors = await validateForm();

                      // mark all fields touched
                      const touchedFields: any = {};

                      Object.keys(errors).forEach((key) => {
                        touchedFields[key] = true;
                      });

                      setTouched(touchedFields);

                      if (Object.keys(errors).length === 0) {

                        const newCompleted = new Set(completedSteps);
                        newCompleted.add(activeStep);
                        setCompletedSteps(newCompleted);

                        if (activeStep === steps.length - 1) {
                          handleSubmit();
                        } else {
                          setActiveStep((prev) => prev + 1);
                          scrollToTop();
                        }

                      }
                    }}
                    label={activeStep === steps.length - 1 ? "Submit" : "Next"}
                  />

                </Stack>

              </Container>
            </Grid>
          </Grid>

        </Form>
      )}
    </Formik>
  );
};

export default Add;
