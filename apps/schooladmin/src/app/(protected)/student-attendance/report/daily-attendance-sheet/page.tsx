'use client';

import React, { useState, useRef } from 'react';
import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";
import { APP_URL } from "@/modules/shared/config/constants";
import { Box, Chip, Grid, IconButton, Pagination, Paper, Popover, Stack, TablePagination, Typography, useTheme } from "@mui/material";

import { ArrowLeft, Eye, Filter, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ColumnDef } from '@/modules/shared/components/customtable/type';
import CustomTable from '@/modules/shared/components/customtable/CustomTable';
import { CustomMultiSelect } from '@/modules/shared/components/forms';
import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import { useDailyAttendanceSheetLogic} from './dailyAttendanceSheet.logic';
import { DailyAttendanceSheetRow } from './dailyAttendanceSheet.types';
import CustomFilters from './dailyAttendanceSheetFilters';


const breadcrumbItems = [
    { label: 'Dashboard', path: APP_URL.DASHBOARD },
    { label: 'Student Attendance', path: '#' },
    { label: 'Report', path: APP_URL.STUDENT_ATTENDANCE_REPORT },
    { label: 'Attendance Summary', path: '#' },
];

const counters = [
    { label: 'Total', value: 2, percent: 100 },
    { label: 'Medical', value: 0, percent: 0 },
    { label: 'Sports', value: 1, percent: 50 },
    { label: 'Leave', value: 1, percent: 50 },
    { label: 'Pending', value: 2, percent: 100 },
];



const DailyAttendanceSheet = () => {
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

        handlePdfDownload,
        handlePdfPreview,
    } = useDailyAttendanceSheetLogic();

    const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
    // columns
    const ALL_COLUMNS: ColumnDef<DailyAttendanceSheetRow>[] = [
        { key: 'serialNo', label: 'S.No' },
        { key: 'first_name', label: 'Name' },
        { key: 'email', label: 'E-Mail' },
        { key: 'mobile', label: 'Mobile No' },
        { key: 'role', label: 'Role' },
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

    const columnApiRef = useRef<{
        visibleColumnKeys: (keyof DailyAttendanceSheetRow | string)[];
        setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof DailyAttendanceSheetRow | string)[]>>;
        columnOptions: { value: string | number; label: string }[];
    } | null>(null);

    const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

    const handleBack = () => {
        router.push(APP_URL.STUDENT_ATTENDANCE_REPORT)
    };

    const handleFilter = (values: any) => {
        applyFilters(values);
        setShowFilters(null);
    };

    return (
        <>
            <Box>
                <Breadcrumbs items={breadcrumbItems} />
                <PageHeader
                    title="Daily Attendance Sheet"
                    buttonLabel="Back to Report"
                    variant="outlined"
                    icon={<ArrowLeft size={16} />}
                    clickHandler={handleBack}
                />
            </Box>

            <CustomFilters
                filterValues={filterValues}
                onApply={applyFilters}
                onReset={resetFilters}
            />

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
        </>
    );
};

export default DailyAttendanceSheet;
