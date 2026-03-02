'use client';

import React, { useState, useRef } from 'react';
import {
    Box,
    Chip,
    Grid,
    IconButton,
    Pagination,
    Paper,
    Popover,
    Stack,
    TablePagination,
    Typography,
    useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Building2,
    ExternalLink,
    Eye,
    Filter,
    IndianRupee,
    Megaphone,
    Pencil,
    Trash2,
    UserCog,
    Users,
} from 'lucide-react';

import CustomTable from '@/modules/shared/components/customtable/CustomTable';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomCard } from '@/modules/shared/components/customcard';
import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import { APP_URL } from '@/modules/shared/config/constants';
import { ColumnDef } from '@/modules/shared/components/customtable/type';
import { CustomMultiSelect } from '@/modules/shared/components/forms';
import { useAttendanceSheetLogic } from './attendanceSheet.logic';
import { AttendanceSheetRow } from './attendanceSheet.types';
import CustomFilters from './AttendanceSheetFilters';



const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Student Attendance', path: '#' },
    { label: 'Report', path: APP_URL.STUDENT_ATTENDANCE_REPORT },
    { label: 'Attendance Sheet', path: '#' },
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



const SchoolInfo = () => {
    const theme = useTheme();
    const router = useRouter();
    const {
        fileLabel,
        visibleColumnsCount,

        isFilterApplied,

        data,
        loading,
        pagination,
        filterValues,
        applyFilters,
        resetFilters,
        changePage,
        changeLimit,
        exportData,

        selectedIds,
        handleRowSelect,
        handleSelectAll,

        // PDF
        handlePdfDownload,
        handlePdfPreview,
    } = useAttendanceSheetLogic(); // Need to Change This


    /* ================= Columns (JSX render allowed here) ================= */

    const ALL_COLUMNS: ColumnDef<AttendanceSheetRow>[] = [
        { key: 'serialNo', label: 'S.No' },
        { key: 'first_name', label: 'Name' },
        { key: 'email', label: 'E-Mail' },
        { key: 'mobile', label: 'Mobile No' },
        { key: 'role', label: 'Mapping' },
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

    /* ================= UI States ================= */
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        ALL_COLUMNS.slice(0, visibleColumnsCount).map(c => String(c.key))
    );

    // store column API
    const columnApiRef = useRef<{
        visibleColumnKeys: (keyof AttendanceSheetRow | string)[];
        setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof AttendanceSheetRow | string)[]>>;
        columnOptions: { value: string | number; label: string }[];
    } | null>(null);

    const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

     const handleBack = () => {
        router.push(APP_URL.STUDENT_ATTENDANCE_REPORT)
    };
    return (
        <Box>
            {/* ===== Breadcrumbs & Header ===== */}
            <Box mb={3}>
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader
                    title="Attendance Sheet"
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

            <CustomFilters
                filterValues={filterValues}

                onApply={(values) => {
                    applyFilters(values);
                }}
                onReset={(values) => {
                    resetFilters(values);
                }}
            />

            {/* ===== Table Container ===== */}
            {isFilterApplied ?
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

                        {/* RIGHT SIDE – Export + Filters */}
                        <Stack direction="row">
                            <ExportActions
                                onExport={(type) => exportData(type)}
                                loading={loading}
                                handlePdfDownload={handlePdfDownload}
                                handlePdfPreview={handlePdfPreview}
                            />
                        </Stack>
                    </Stack>

                    {/* ===== Table ===== */}
                    <Box mb={2}>
                        <CustomTable
                            rows={data.userList ? data.userList : []}
                            columns={ALL_COLUMNS}
                            defaultVisibleCount={visibleColumnsCount}
                            emptyMessage="No Learners Found in your search"
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

                    {/* ===== Pagination ===== */}
                    {data.userList && data.userList.length != 0 &&
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <TablePagination
                                component="div"
                                count={pagination.total}
                                page={pagination.page - 1}
                                rowsPerPage={pagination.limit}
                                onPageChange={(_, newPage) => changePage(newPage + 1)}
                                onRowsPerPageChange={(e) =>
                                    changeLimit(parseInt(e.target.value, 10))
                                }
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: (theme) => theme.palette.background.paper,
                                    py: 1,
                                    '& .MuiTablePagination-toolbar': { justifyContent: 'center', gap: 1 },
                                    '& .MuiTablePagination-spacer': { display: 'none' },
                                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                        margin: 0,
                                        fontWeight: 500,
                                        color: 'text.secondary',
                                        fontSize: '0.85rem',
                                    },
                                    '& .MuiTablePagination-actions button': { display: 'none' },
                                }}
                            />

                            <Pagination
                                count={Math.ceil(pagination.total / pagination.limit)}
                                page={pagination.page}
                                onChange={(_, value) => changePage(value)}
                                shape="rounded"
                            />
                        </Box>
                    }
                </Paper>
                : 'Please select and apply filters to view the data.'
            }

        </Box>
    );
};

export default SchoolInfo;