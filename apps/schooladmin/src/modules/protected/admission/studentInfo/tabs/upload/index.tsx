'use client';

import React, { useState } from 'react';
import {
  Paper,
  Grid,
  useTheme,
  Box,
} from '@mui/material';
import { X, SkipForward, Save } from 'lucide-react';
import { Formik, Form } from 'formik';
import {CustomSelect } from '@/modules/shared/components/forms';
import ActionButton from '@/modules/shared/ActionButton';


// -------------------- Options --------------------
const smsGatewayOptions = [
  { label: 'Select Sms Gateway', value: 0 },
  { label: 'Twilio', value: 1 },
  { label: 'TextLocal', value: 2 },
];

const whatsappOptions = [
  { label: 'NO', value: 0 },
  { label: 'YES', value: 1 },
];

// -------------------- Initial Values --------------------
const initialValues = {
  smsGateway: '',
  whatsappIntegration: 0,
};

const Upload = ({ setActiveIndex }: any) => {
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);

  const handleSaveNext = () => {
    console.log('Save & Next ');
    setActiveIndex(4)
  };

  return (
    <>
      {/* -------------------- Header Paper -------------------- */}
      <Paper
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow:
            '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          p: { xs: 1, sm: 2, md: 1.5 },
        }}
      >

        <Formik
          initialValues={initialValues}
          onSubmit={handleSaveNext}
        >
          {({
            values,
            setFieldValue,
            touched,
            errors,
          }) => (
            <Form id="paymentForm">
              <Grid container spacing={2}>
                {/* SMS Integration */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelect
                    id="smsGateway"
                    name="smsGateway"
                    label="Sms Integration"
                    value={values.smsGateway}
                    options={smsGatewayOptions}
                    placeholder="Select Sms Gateway"
                    touched={touched.smsGateway}
                    error={errors.smsGateway}
                    onChange={(e) =>
                      setFieldValue(
                        'smsGateway',
                        e.target.value
                      )
                    }
                  />
                </Grid>

                {/* WhatsApp Integration */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomSelect
                    id="whatsappIntegration"
                    name="whatsappIntegration"
                    label="Whatsapp Integration"
                    value={values.whatsappIntegration}
                    options={whatsappOptions}
                    touched={touched.whatsappIntegration}
                    error={errors.whatsappIntegration}
                    onChange={(e) =>
                      setFieldValue(
                        'whatsappIntegration',
                        e.target.value
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

      </Paper>


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
            setActiveIndex(4)
          }
        />
        {/* Cancel */}
        <ActionButton
          label="Cancel"
          variant="outlined"
          icon={<X size={16} />}
          clickHandler={() => setActiveIndex(3)}
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

    </>
  );
};

export default Upload;
