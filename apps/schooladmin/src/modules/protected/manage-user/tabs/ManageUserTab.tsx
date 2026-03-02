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

import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import { ColumnDef } from '@/modules/shared/components/customtable/type';

import { useManageUserLogic } from './manageUser.logic';
import { User } from './manageUser.types';
import CustomFilters from './partials/Filters';
import { CustomMultiSelect } from '@/modules/shared/components/forms';



export const ManageUserTab = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    fileLabel,
    visibleColumnsCount,

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

    // PDF
    handlePdfDownload,
    handlePdfPreview,
  } = useManageUserLogic(); // Need to Change This



  const ALL_COLUMNS: ColumnDef<User>[] = [
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

  const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    ALL_COLUMNS.slice(0, visibleColumnsCount).map(c => String(c.key))
  );

  // store column API
  const columnApiRef = useRef<{
    visibleColumnKeys: (keyof User | string)[];
    setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof User | string)[]>>;
    columnOptions: { value: string | number; label: string }[];
  } | null>(null);

  const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

  /* ================= Render ================= */

  return (
    <Box>

      {/* ===== Table Container ===== */}
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
              <CustomFilters
                filterValues={filterValues}
                onApply={(values) => {
                  applyFilters(values);
                  setShowFilters(null);
                }} />
            </Popover>
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
    </Box>
  );
};
