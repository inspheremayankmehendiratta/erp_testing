'use client'
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
    StepIconProps,
    useMediaQuery,
    Skeleton,
    Box
} from '@mui/material';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    /* HORIZONTAL (alternativeLabel) */
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 25,
    },

    /* ACTIVE + COMPLETED */
    [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: `linear-gradient(
        95deg,
        var(--mui-palette-primary-200) 0%,
        var(--mui-palette-primary-main) 50%,
        var(--mui-palette-primary-dark) 100%
      )`,
        },
    },

    /* DEFAULT LINE */
    [`& .${stepConnectorClasses.line}`]: {
        border: 0,
        borderRadius: 1,
        backgroundColor: 'var(--mui-palette-secondary-200)',
    },

    /* HORIZONTAL LINE */
    [`&.${stepConnectorClasses.horizontal} .${stepConnectorClasses.line}`]: {
        height: 3,
    },

    /* VERTICAL LINE (THIS FIXES THE BREAK) */
    [`&.${stepConnectorClasses.vertical} .${stepConnectorClasses.line}`]: {
        width: 3,
        minHeight: 32,
        marginLeft: 4,

        [theme.breakpoints.up('sm')]: {
            marginLeft: 12,
        },
    },
}));


const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean; clickable?: boolean };
}>(({ theme }) => ({
    backgroundColor: 'var(--mui-palette-secondary-200)',
    zIndex: 1,
    color: '#fff',
    width: 52,
    height: 52,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundSize: '200% 100%',
    backgroundPosition: 'right bottom',

    [theme.breakpoints.down('sm')]: {
        width: 35,
        height: 35,
    },
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage: `linear-gradient(136deg, var(--mui-palette-primary-200) 0%, var(--mui-palette-primary-main) 50%, var(--mui-palette-primary-dark) 100%)`,
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage: `linear-gradient(136deg, var(--mui-palette-primary-200) 0%, var(--mui-palette-primary-main) 50%, var(--mui-palette-primary-dark) 100%)`,
            },
        },
        {
            props: ({ ownerState }) => ownerState.clickable,
            style: {
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 6px 14px 0 rgba(0,0,0,.3)',
                },
            },
        },
    ],
}));

interface GenericStep {
    label: string;
    icon: React.ReactNode;
}

type CustomStepperProps = {
    activeStep: number;
    steps: GenericStep[];
    /** Callback when a step is clicked - receives the step index */
    onStepClick?: (stepIndex: number) => void;
    /** Set of completed step indices - determines which steps can be navigated to */
    completedSteps?: Set<number>;
}

export default function CustomStepper({
    activeStep,
    steps,
    onStepClick,
    completedSteps = new Set()
}: CustomStepperProps) {
    const theme = useTheme();
    const isVertical = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Box>
                {steps.map((_, index: number) => (
                    <Skeleton
                        key={index}
                        variant="circular"
                        sx={{
                            flexShrink: 0,
                            width: { xs: 35, md: 52 },
                            height: { xs: 35, md: 52 }
                        }}
                    />
                ))}
            </Box>
        );
    }

    // Check if a step is clickable (can navigate to it)
    const isStepClickable = (stepIndex: number): boolean => {
        // Can't click on current step
        if (stepIndex === activeStep) return false;

        // For previous steps: can click if that step is completed
        if (stepIndex < activeStep) {
            return completedSteps.has(stepIndex);
        }

        // For next steps: can only click if current step is completed
        // and all steps before target are completed
        if (stepIndex > activeStep) {
            // Check if all steps from current up to (but not including) target are completed
            for (let i = activeStep; i < stepIndex; i++) {
                if (!completedSteps.has(i)) return false;
            }
            return true;
        }

        return false;
    };

    const handleStepClick = (stepIndex: number) => {
        if (isStepClickable(stepIndex) && onStepClick) {
            onStepClick(stepIndex);
        }
    };

    const DynamicStepIcon = (props: StepIconProps) => {
        const { active, completed, className, icon } = props;
        const stepIndex = Number(icon) - 1;
        const stepIcon = steps[stepIndex]?.icon;
        const clickable = isStepClickable(stepIndex);

        return (
            <ColorlibStepIconRoot
                ownerState={{ completed, active, clickable }}
                className={className}
                onClick={() => handleStepClick(stepIndex)}
            >
                {stepIcon}
            </ColorlibStepIconRoot>
        );
    };

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel={!isVertical}
                orientation={isVertical ? 'vertical' : 'horizontal'}
                connector={<ColorlibConnector />}
            >
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel
                            slots={{
                                stepIcon: DynamicStepIcon,
                                ...(isVertical ? { label: () => null } : {}),
                            }}
                            slotProps={
                                !isVertical
                                    ? {
                                        label: {
                                            sx: {
                                                typography: 'body2',
                                                mt: 1,
                                                textAlign: 'center',
                                            },
                                        },
                                    }
                                    : undefined
                            }
                        >
                            {!isVertical && step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}