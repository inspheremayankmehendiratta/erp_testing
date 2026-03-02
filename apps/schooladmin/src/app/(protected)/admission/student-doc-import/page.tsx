'use client';

import {
    Box,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomTabs } from '@/modules/shared/components/customtabs';



const tabs = [
    'Student Image Import',
    'Student Report (Excel) Import',
    'Offical info Import',
    'Student section Import',
    'Feild wise Import',
];




const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Admission', path: '#' },
    { label: 'Student Doc Import', path: '#' },
];

const StudentDocImport = () => {
    const theme = useTheme();
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleBack = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else {
            router.push(APP_URL.MANAGE_SCHOOL)
        }
    };

    return (
        <Box>
            {/* ===== Breadcrumbs & Header ===== */}
            <Box mb={3}>
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader
                    title="Student Doc Import"
                />
            </Box>
            <Box>
                <CustomTabs
                    tabs={tabs}
                    activeIndex={activeIndex}
                    onTabClick={handleTabClick}
                    bgColor={theme.palette.background.paper}
                />

                {/* <Box mt={3}>
                    {activeIndex === 0 && <StudentImage setActiveIndex={setActiveIndex} />}
                    {activeIndex === 1 && <div><StudentRecord setActiveIndex={setActiveIndex} /></div>}
                    {activeIndex === 2 && <div><OfficalInfo setActiveIndex={setActiveIndex} /></div>}
                    {activeIndex === 3 && <div><StudentSection setActiveIndex={setActiveIndex} /></div>}
                    {activeIndex === 4 && <div><FiledWise setActiveIndex={setActiveIndex} /></div>}
                </Box> */}
            </Box>

        </Box>
    );
};

export default StudentDocImport;
