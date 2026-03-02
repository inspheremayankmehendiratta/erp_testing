

'use client';
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { APP_URL } from '@/modules/shared/config/constants';
import { useRouter } from 'next/navigation';

import { CustomTabs } from '@/modules/shared/components/customtabs';
import BasicInfo from '@/modules/protected/admission/studentInfo/tabs/basicinfo';
import PersonalInfo from '@/modules/protected/admission/studentInfo/tabs/personalinfo';
import ParentInfo from '@/modules/protected/admission/studentInfo/tabs/parentinfo';
import OfficalInfo from '@/modules/protected/admission/studentInfo/tabs/officalinfo';
import Upload from '@/modules/protected/admission/studentInfo/tabs/upload';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';





const tabs = [
    'Basic Information',
    'Personal Information',
    'Parent Information',
    'Official Information',
    'Upload Document',
];


type CreateSchoolProps = {
    children?: React.ReactNode;
};
const tabBreadcrumbMap = [
    'School Info',
    'Allotments',
    'Payment Type',
    'SMS / WhatsApp Integration',
];




const Add = ({ children }: CreateSchoolProps) => {
    const theme = useTheme();
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const breadcrumbItems = [
        { label: 'Dashboard', path: APP_URL.DASHBOARD },
        { label: 'Admission', path: APP_URL.MANAGE_SCHOOL },
        { label: tabBreadcrumbMap[activeIndex], path: '#' },
    ];

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
    };

   const handleBack = () => {
       if (activeIndex > 0) {
         setActiveIndex(activeIndex - 1);
       } else {
         router.push(APP_URL.ADMISSION_STUDENT_INFO_LIST)
       }
     };



    return (
        <>
            <Box mb={3}>
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader
                    title="Student Info"
                    buttonLabel={
                        activeIndex === 0
                            ? 'Back to Admission'
                            : `Back to ${tabs[activeIndex - 1]}`
                    }

                    variant='outlined'
                    icon={<ArrowLeft size={16} />}
                    clickHandler={handleBack}

                />
            </Box>
            <Box>
                <CustomTabs
                    tabs={tabs}
                    activeIndex={activeIndex}
                    onTabClick={handleTabClick}
                    bgColor={theme.palette.background.paper}
                />

                <Box mt={3}>
                    {activeIndex === 0 && <BasicInfo setActiveIndex={setActiveIndex} />}
                    {activeIndex === 1 && <div><PersonalInfo setActiveIndex={setActiveIndex} /></div>}
                    {activeIndex === 2 && <div><ParentInfo setActiveIndex={setActiveIndex} /></div>}
                    {activeIndex === 3 && <div><OfficalInfo setActiveIndex={setActiveIndex} /></div>}
                    {activeIndex === 4 && <div><Upload setActiveIndex={setActiveIndex} /></div>}
                </Box>
            </Box>
        </>

    );
};

export default Add;
