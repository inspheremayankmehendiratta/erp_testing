import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";




const Dashboard = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', path: '/admin/home/index' },
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <PageHeader
                title="Dashboard"
            />

        </>
    )
}

export default Dashboard;