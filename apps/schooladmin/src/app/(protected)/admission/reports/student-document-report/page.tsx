
'use client';


import { CustomCard } from "@/modules/shared/components/customcard";
import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";
import { APP_URL } from "@/modules/shared/config/constants";

import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";

import { ArrowLeft } from "lucide-react";

import { useRouter } from "next/navigation";


const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Admission', path: '#' },
    { label: 'Report', path: APP_URL.ADMISSION_REPORTS },
    { label: 'Student Document Report', path: '#' },
];

const counters = [
    { label: 'Total', value: 2, percent: 100 },
    { label: 'Medical', value: 0, percent: 0 },
    { label: 'Sports', value: 1, percent: 50 },
    { label: 'Leave', value: 1, percent: 50 },
    { label: 'Pending', value: 2, percent: 100 },
];




const circleSize = 72;
const stroke = 6;
const radius = (circleSize - stroke) / 2;
const circumference = 2 * Math.PI * radius;

const StudentDocumentReport = () => {
    const theme = useTheme();
    const router = useRouter()







    const handleBack = () => {
        router.push(APP_URL.ADMISSION_REPORTS)
    }
    return (
        <>  <Box>
            <Breadcrumbs items={breadcrumbItems} />
            <PageHeader
                title="Student Document Report"
                buttonLabel={"Back to report"}
                variant='outlined'
                icon={<ArrowLeft size={16} />}
                clickHandler={handleBack}
            />
        </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    px: 0.5,
                    mb: 2,
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {counters.map((item, index) => {
                    const progress =
                        circumference - (item.percent / 100) * circumference;

                    return (
                        <CustomCard
                            key={index}
                            padding={2}
                            bgcolor="#FFF"
                            styles={{
                                minWidth: 220,
                                borderRadius: '18px',
                                border: '1px solid #E6E6E6',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                {/* ===== Circle Progress ===== */}
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: circleSize,
                                        height: circleSize,
                                    }}
                                >
                                    <svg width={circleSize} height={circleSize}>
                                        {/* Background */}
                                        <circle
                                            stroke="#F1F1F1"
                                            fill="transparent"
                                            strokeWidth={stroke}
                                            r={radius}
                                            cx={circleSize / 2}
                                            cy={circleSize / 2}
                                        />

                                        {/* Progress */}
                                        <circle
                                            stroke={'#F59E0B'}
                                            fill="transparent"
                                            strokeWidth={stroke}
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={progress}
                                            r={radius}
                                            cx={circleSize / 2}
                                            cy={circleSize / 2}
                                            style={{
                                                transition: 'stroke-dashoffset 0.5s ease',
                                            }}
                                        />
                                    </svg>

                                    {/* Percent Text */}
                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.percent}%
                                    </Typography>
                                </Box>

                                {/* ===== Right Content ===== */}
                                <Stack alignItems="flex-end">
                                    <Typography
                                        fontWeight={700}
                                        fontSize={22}
                                    >
                                        {item.value}
                                    </Typography>

                                    <Typography
                                        fontSize={14}
                                        color="text.secondary"
                                    >
                                        {item.label}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CustomCard>
                    );
                })}
            </Box>
            <Paper
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                }}
            >
                {/* ===== Actions ===== */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    px={2}
                >
                    {/* LEFT SIDE – Column visibility */}
                    {/* <CustomMultiSelect
                        id="column-visibility"
                        name="columnVisibility"
                        value={visibleColumns}
                        options={columnApiRef.current?.columnOptions ?? defaultColumnOptions}
                        placeholder="Columns"
                        onChange={(e) => {
                            const newKeys = e.target.value as string[];
                            setVisibleColumns(newKeys);
                            columnApiRef.current?.setVisibleColumnKeys(newKeys);
                        }}


                    /> */}

                    {/* RIGHT SIDE – Export + Filters */}

                    <Stack direction="row" spacing={1} alignItems="center">

                        {/* ===== EXPORT ===== */}
                        {/* <ExportActions
                            onExport={(type) => exportData(type)}
                            loading={loading}
                        />

                        <Stack direction="row">
                            <ExportActions
                                onExport={(type) => exportData(type)}
                                loading={loading}
                            />

                            <IconButton onClick={(e) => setShowFilters(e.currentTarget)}>
                                <Filter size={20} />
                            </IconButton>

                            <Popover
                                open={Boolean(showFilters)}
                                anchorEl={showFilters}
                                onClose={() => setShowFilters(null)}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                slotProps={{
                                    paper: { sx: { width: 420, p: 2 } },
                                }}
                            >
                                <CustomFilters onApply={() => setShowFilters(null)} />
                            </Popover>
                        </Stack> */}

                    </Stack>


                </Stack>

                {/* ===== Table ===== */}

            </Paper>

        </>
    );
};

export default StudentDocumentReport;