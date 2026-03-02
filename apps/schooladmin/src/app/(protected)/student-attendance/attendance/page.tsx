'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
  useTheme,
  TablePagination,
  Pagination,
  IconButton,
  Popover,
  Chip,
} from '@mui/material';
import { APP_URL } from '@/modules/shared/config/constants';
import { CustomMultiSelect, CustomSelect } from '@/modules/shared/components/forms';
import { Eye, Filter, Pencil, Trash2 } from 'lucide-react';

import { ColumnDef } from '@/modules/shared/components/customtable/type';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomCard } from '@/modules/shared/components/customcard';
import ActionButton from '@/modules/shared/ActionButton';
import { CustomTable } from '@/modules/shared/components/customtable';


import CustomFilters from './partials/Filters';
import { AttendanceRow } from './attendance.types';
import { useAttendanceLogic } from './attendance.logic';
import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import { schoolOptions } from '@/modules/shared/config/config';





const statusOptions = [
  { label: 'Select Status', value: '' },
  { label: 'Present', value: 'Present' },
  { label: 'Absent', value: 'Absent' },
];

const remarkOptions = [
  { label: 'Select Remark', value: '' },
  { label: 'Sick', value: 'Sick' },
  { label: 'Leave', value: 'Leave' },
  { label: 'Late', value: 'Late' },
];



const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Student Attendance', path: '#' },
  { label: 'Attendance', path: '#' },
];
const Attendance = () => {
  const theme = useTheme();

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
  } = useAttendanceLogic();

  const ALL_COLUMNS: ColumnDef<AttendanceRow>[] = [
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
    visibleColumnKeys: (keyof AttendanceRow | string)[];
    setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof AttendanceRow | string)[]>>;
    columnOptions: { value: string | number; label: string }[];
  } | null>(null);

  const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

  const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
  const counterList = [
    { label: 'Total', value: 100 },
    { label: 'Present', value: 1 },
    { label: 'Absent', value: 2 },
    { label: 'Leave', value: 3 },
    { label: 'Sports', value: 2 },
    { label: 'Medical', value: 5 },
  ];

  return (
    <>
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader title="Attendance" />
      </Box>

      <CustomCard>
        <Stack direction="row" spacing={3}>

          {counterList.map((item, i) => (
            <Stack key={i} alignItems="center" spacing={1}>

              {/* Circle */}
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: '6px solid #D9D9D9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#FFF',
                  fontWeight: 700,
                  fontSize: 18,
                  position: 'relative',

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 4,
                    borderRadius: '50%',
                    border: '2px solid #EFEFEF',
                  },
                }}
              >
                {item.value}
              </Box>

              {/* Label */}
              <Typography fontSize={14} color="#555">
                {item.label}
              </Typography>

            </Stack>
          ))}

        </Stack>


      </CustomCard>

      {/* ================= Filters ================= */}
      <CustomFilters
        filterValues={filterValues}

        onApply={(values) => {
          applyFilters(values);
        }}
        onReset={(values) => {
          resetFilters(values);
        }}
      />

      {/* bulk actions */}


      {/* table container */}
      <Box>
        <Paper elevation={0} sx={{ marginTop: 3, bgcolor: theme.palette.background.paper, borderRadius: 2, border: '1px solid', borderColor: theme.palette.divider }}>


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
        </Paper>
      </Box>
    </>
  );
}
export default Attendance;

