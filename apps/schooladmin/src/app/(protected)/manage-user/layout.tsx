'use client';

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';


import { CustomTabs } from '@/modules/shared/components/customtabs';
import { usePathname, useRouter } from 'next/navigation';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { APP_URL } from '@/modules/shared/config/constants';
import { FieldWiseImport, ManageUserTab } from '@/modules/protected/manage-user';

// placeholder for future field-wise import tab


const tabs = [
    'Manage User',
    'Field Wise import'
];

export default function ManageUserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme();
    const router = useRouter();

    const pathname = usePathname();

    const isCreatePage = pathname.includes("add");

    const [activeIndex, setActiveIndex] = useState(0);

    const breadcrumbItems = [
        { label: 'Dashboard', path: APP_URL.DASHBOARD },
        { label: 'Manage User', path: "#" },
    ];

    const handleTabClick = (index: number) => {
        console.log("Tab clicked:", index);
        setActiveIndex(index)
    };


    const handleCreate = () => {
        if (activeIndex === 0) {
            router.push(APP_URL.ADD_USER)
        }
        

    }

    return (
        <>
            {/* Header */}
            <Box mb={3}>
                <Breadcrumbs items={breadcrumbItems} />

                <PageHeader
                    title="Manage User"
                    buttonLabel="Create"
                    clickHandler={() => handleCreate()}

                />
            </Box>

            {/* tabs always visible */}
            <CustomTabs
                tabs={tabs}
                activeIndex={activeIndex}
                onTabClick={handleTabClick}
                bgColor={theme.palette.background.paper}
            />

            <Box mt={3}>
                {isCreatePage ? (
                    // when on add page, render the form children
                    children
                ) : (
                    // regular tab content
                    <>
                        {activeIndex === 0 && <ManageUserTab />}
                        {activeIndex === 1 && <FieldWiseImport />}
                    </>
                )}
            </Box>
        </>
    );
}
