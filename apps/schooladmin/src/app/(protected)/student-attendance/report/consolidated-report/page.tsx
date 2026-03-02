
'use client';


import { CustomCard } from "@/modules/shared/components/customcard";
import ExportActions from "@/modules/shared/components/customfilters/ExportActions";
import { CustomTable } from "@/modules/shared/components/customtable";
import { CustomMultiSelect } from "@/modules/shared/components/forms";
import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";
import { APP_URL } from "@/modules/shared/config/constants";
import { Avatar, Box, Chip, IconButton, Pagination, Paper, Popover, Stack, TablePagination, Typography, useTheme } from "@mui/material";
import { ArrowLeft, Eye, Filter, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { ColumnDef } from "@/modules/shared/components/customtable/type";
import { ConsolidatedRow } from './consolidatedReport.types';

import { useConsolidatedReportLogic } from './consolidatedReport.logic';
import ConsolidatedReportFilters from './ConsolidatedReportFilters';

const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Student Attendance', path: '#' },
    { label: 'Report', path: APP_URL.STUDENT_ATTENDANCE_REPORT },
    { label: 'Consolidated Report', path: '#' },
];

const counters = [
    { label: 'Total', value: 2, percent: 100 },
    { label: 'Medical', value: 0, percent: 0 },
    { label: 'Sports', value: 1, percent: 50 },
    { label: 'Leave', value: 1, percent: 50 },
    { label: 'Pending', value: 2, percent: 100 },
];

// column definitions for the consolidated report table




// row type is imported above from consolidatedReport.types

const circleSize = 72;
const stroke = 6;
const radius = (circleSize - stroke) / 2;
const circumference = 2 * Math.PI * radius;

const ConsolidatedReport = () => {
    const theme = useTheme();
    const router = useRouter();

    const {
        data,
        loading,
        pagination,
        filterValues,
        applyFilters,
        changePage,
        changeLimit,
        exportData,
        selectedIds,
        handleRowSelect,
        handleSelectAll,
        handlePdfDownload,
        handlePdfPreview,
        fileLabel,
        visibleColumnsCount,
    } = useConsolidatedReportLogic();



    const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
    const [filterClicked, setFilterClicked] = useState(false);

    const ALL_COLUMNS: ColumnDef<ConsolidatedRow>[] = [
        { key: 'first_name', label: 'Class Section' },
        { key: 'email', label: 'Date' },
        {
            key: "total",
            label: "Total",
            render: (row) => row.total ?? 0,
        },
        {
            key: "present",
            label: "Present",
            render: (row) => (
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#F4C7C7" }}>
                    {row.present ?? 0}
                </Avatar>
            ),
        },
        {
            key: "absent",
            label: "Absent",
            render: (row) => (
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#F4C7C7" }}>
                    {row.absent ?? 0}
                </Avatar>
            ),
        },
        {
            key: "leave",
            label: "Leave",
            render: (row) => (
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#F2D2BE" }}>
                    {row.leave ?? 0}
                </Avatar>
            ),
        },
        {
            key: "sports",
            label: "Sports",
            render: (row) => (
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#C7D6E6" }}>
                    {row.sports ?? 0}
                </Avatar>
            ),
        },
        {
            key: "medical",
            label: "Medical",
            render: (row) => (
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#CDE9EA" }}>
                    {row.medical ?? 0}
                </Avatar>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <Chip
                    label={row.status}
                    size="small"
                    sx={{
                        bgcolor:
                            row.status === 'active'
                                ? theme.palette.primary.light
                                : theme.palette.primary.contrastText,
                        fontWeight: 600,
                        borderRadius: '6px',
                    }}
                />
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            render: () => (
                <Stack direction="row" spacing={1}>
                    <IconButton size="small"><Eye size={16} /></IconButton>
                    <IconButton size="small"><Pencil size={16} /></IconButton>
                    <IconButton size="small" color="error"><Trash2 size={16} /></IconButton>
                </Stack>
            ),
        },
    ];
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        ALL_COLUMNS.slice(0, visibleColumnsCount).map(c => String(c.key))
    );

    // store column API
    const columnApiRef = useRef<{
        visibleColumnKeys: (keyof ConsolidatedRow | string)[];
        setVisibleColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
        columnOptions: { value: string | number; label: string }[];
    } | null>(null);

    const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

    const handleBack = () => {
        router.push(APP_URL.STUDENT_ATTENDANCE_REPORT)
    };

    const handleFilter = (values: any) => {
        setFilterClicked(true);
        applyFilters(values);
    };

    return (
        <>
            <Box>
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader
                    title="Consolidated Report"
                    buttonLabel={"Back to report"}
                    variant='outlined'
                    icon={<ArrowLeft size={16} />}
                    clickHandler={handleBack}
                />
            </Box>

            {/* metrics cards */}
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

            {/* action toolbar */}
            <Paper
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    px={2}
                >
                    <CustomMultiSelect
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
                    />

                    <Stack direction="row">
                        <ExportActions
                            onExport={(type) => exportData(type)}
                            loading={loading}
                            handlePdfDownload={handlePdfDownload}
                            handlePdfPreview={handlePdfPreview}
                        />

                        <IconButton onClick={(e) => setShowFilters(e.currentTarget)}>
                            <Filter size={20} />
                        </IconButton>

                        <Popover
                            open={Boolean(showFilters)}
                            anchorEl={showFilters}
                            onClose={() => setShowFilters(null)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            slotProps={{ paper: { sx: { width: 420, p: 2 } } }}
                        >
                            <ConsolidatedReportFilters
                                filterValues={filterValues}
                                onApply={(vals) => {
                                    handleFilter(vals);
                                    setShowFilters(null);
                                }}
                            />
                        </Popover>
                    </Stack>
                </Stack>

                {/* table */}
                <Box mb={2}>
                    <CustomTable
                        rows={data.userList ? data.userList : []}
                        columns={ALL_COLUMNS}
                        defaultVisibleCount={visibleColumnsCount}
                        checkboxSelection
                        currentPage={pagination.page}
                        rowsPerPage={pagination.limit}
                        loading={loading}
                        selectedIds={selectedIds}
                        onRowSelect={handleRowSelect}
                        onSelectAll={handleSelectAll}
                        columnVisibilityApi={(api) => {
                            columnApiRef.current = api;
                            setVisibleColumns(api.visibleColumnKeys as string[]);
                        }}
                    />
                </Box>

                {/* pagination */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <TablePagination
                        component="div"
                        count={pagination.total}
                        page={pagination.page - 1}
                        rowsPerPage={pagination.limit}
                        onPageChange={(_, p) => changePage(p + 1)}
                        onRowsPerPageChange={(e) => changeLimit(parseInt(e.target.value, 10))}
                    />

                    <Pagination
                        count={Math.ceil(pagination.total / pagination.limit)}
                        page={pagination.page}
                        onChange={(_, v) => changePage(v)}
                    />
                </Box>
            </Paper>
        </>
    );
};

export default ConsolidatedReport;