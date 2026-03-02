
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import OTPInput from "react-otp-input";
import { CustomInput } from "@/modules/shared/components/forms";
import { Captcha } from "@/modules/shared/components/forms/GenerateCaptcha";




interface LoginViaOTPProps {
    msg?: string;
    setShowOtpScreen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const captchaSchema = Yup.object({
    captcha: Yup.string()
        .required('Captcha is required')
        .max(6, 'Captcha must be at most 6 characters')
        .min(6, 'Captcha must be 6 characters'),
});

const OtpValid: React.FC<LoginViaOTPProps> = ({
    msg,
    setShowOtpScreen
}: any) => {
    const [otp, setOtp] = useState('');
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showOtpTimer, setShowOtpTimer] = useState(true);
    const [min, setMin] = useState(1);
    const [sec, setSec] = useState(0);

    const captchaRef = useRef<{ reload: () => void }>(null);
    const [actualCaptcha, setActualCaptcha] = useState('');

    const router = useRouter()

    useEffect(() => {
        if (!showOtpTimer) return;

        const timer = setInterval(() => {
            if (sec > 0) setSec(sec - 1);
            else if (min > 0) {
                setMin(min - 1);
                setSec(59);
            } else {
                setShowOtpTimer(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [min, sec, showOtpTimer]);

    const handleVerifyOtp = () => {

        if (otp.length !== 6) {
            setSubmitError('Enter valid OTP');
            return;
        }

        router.push('/dashboard');
    };

    return (
        <Formik
            initialValues={{ captcha: '' }}
            validationSchema={captchaSchema}
            onSubmit={(values) => {
                if (values.captcha !== actualCaptcha) {
                    setSubmitError('Captcha does not match');
                    captchaRef.current?.reload();
                    return;
                }
                handleVerifyOtp();
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form noValidate>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography sx={{ fontSize: 14, color: '#666' }}>
                            {msg}
                        </Typography>
                    </Box>

                    {submitError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {submitError}
                        </Alert>
                    )}

                    {/* OTP INPUT */}


                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                            width: '44px',
                            height: '44px',
                            margin: '0 6px',
                            borderRadius: '8px',
                            border: '1px solid #c4c4c4',
                            fontSize: '18px',
                            textAlign: 'center',
                        }}
                        renderInput={(props) => <input {...props} />}
                    />

                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mt: 3 }}
                    >
                        {/* LEFT: TIMER */}
                        <Grid>
                            {showOtpTimer && (
                                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                                    Resend OTP in {min}:{sec < 10 ? `0${sec}` : sec}
                                </Typography>
                            )}
                        </Grid>

                        {/* RIGHT: RESEND */}
                        <Grid>
                            {!showOtpTimer && (
                                <Button
                                    variant="text"
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                    onClick={() => {
                                        setMin(1);
                                        setSec(0);
                                        setShowOtpTimer(true);
                                    }}
                                >
                                    Resend OTP
                                </Button>
                            )}
                        </Grid>
                    </Grid>



                    {/* CAPTCHA */}
                    <Grid container spacing={2} alignItems="center">
                        {/* Captcha Image */}
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Captcha
                                numberOfCharacters={6}
                                backgroundColor="white"
                                fontColor="black"
                                onChange={setActualCaptcha}
                                ref={captchaRef}
                            />
                        </Grid>

                        {/* Captcha Input */}
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <CustomInput
                                id="captcha"
                                name="captcha"
                                label="Captcha"
                                required
                                placeholder="Enter captcha"
                                value={values.captcha}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                touched={touched.captcha}
                                error={errors.captcha}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => captchaRef.current?.reload()}
                                            edge="end"
                                            aria-label="Reload captcha"
                                        >
                                            <RefreshOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>

                    {/* VERIFY BUTTON */}
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={otp.length !== 6}
                        sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
                    >
                        Verify OTP
                    </Button>

                    {/* TIMER / RESEND */}

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => setShowOtpScreen?.(false)}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                            Login via Password
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default OtpValid;
