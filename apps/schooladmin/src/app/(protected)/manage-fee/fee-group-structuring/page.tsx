'use client';

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { CustomTabs } from '@/modules/shared/components/customtabs';

import { ManageGroups, ManageInstallment } from "./components/tabs";

import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';

const tabs = [
    'Manage Groups',
    'Manage Installment',
    'Manage Components',
    'Fee Structure',
    'Group & Component Import',
];

const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Manage Fee', path: "#" },
];

export default function FeeGroupStructuring({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme();

    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveIndex(index)
    };



    return (
        <>
            <Box mb={3}>
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader
                    title="Fee Group Structuring"
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
                    {activeIndex === 0 && <ManageGroups />}
                    {activeIndex === 1 && <ManageInstallment />}
                    {/* {activeIndex === 2 && <ManageComponents />}
                    {activeIndex === 3 && <FeeStructure />}
                    {activeIndex === 4 && <GroupComponentImport />} */}
                </Box>
            </Box>
        </>
    );
}

