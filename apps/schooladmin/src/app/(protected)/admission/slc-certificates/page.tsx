'use client';

import React, { useState, useRef, useMemo } from 'react';
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
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomCard } from '@/modules/shared/components/customcard';
import CustomFilters from './SlcCertificatesFilters';
import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import { APP_URL } from '@/modules/shared/config/constants';
import { ColumnDef } from '@/modules/shared/components/customtable/type';
import { CustomInput, CustomMultiSelect } from '@/modules/shared/components/forms';

import { useSlcCertificateLogic } from './SlcCertificates.logic';
import { SlcCertificate } from './SlcCertificates.types';

const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Admission', path: '#' },
  { label: 'SLC Certificate', path: '#' },
];

const SlcCertificatePage = () => {
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
  } = useSlcCertificateLogic();



  const ALL_COLUMNS: ColumnDef<SlcCertificate>[] = [
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

  const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    ALL_COLUMNS.slice(0, visibleColumnsCount).map(c => String(c.key))
  );

  const columnApiRef = useRef<{
    visibleColumnKeys: (keyof SlcCertificate | string)[];
    setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof SlcCertificate | string)[]>>;
    columnOptions: { value: string | number; label: string }[];
  } | null>(null);

  const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

  const [searchText, setSearchText] = useState("");

  const filteredRows = useMemo(() => {
    const list: SlcCertificate[] = Array.isArray(data?.userList) ? data!.userList : [];
    if (!searchText) return list;

    return list.filter((row: SlcCertificate) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  return (
    <Box>
      {/* ===== Breadcrumbs & Header ===== */}
      <Box mb={3}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageHeader
          title="SLC Certificate"
        />
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


      {/* table container along with actions/filter popover */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.divider,
          mb: 3,
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
          <Stack direction="row" alignItems="center" mb={1} spacing={1}>
            <CustomMultiSelect
              id="column-visibility"
              name="columnVisibility"
              value={visibleColumns}
              options={columnApiRef.current?.columnOptions ?? defaultColumnOptions}
              placeholder="Columns"
              onChange={(e: any) => {
                const newKeys = e.target.value as string[];
                setVisibleColumns(newKeys);
                columnApiRef.current?.setVisibleColumnKeys(newKeys);
              }}
            />
            <CustomInput
              id="search-text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              name='searchText'

            />
          </Stack>

          {/* RIGHT SIDE – Export + Filters */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <ExportActions
              onExport={(type) => exportData(type)}
              loading={loading}
              handlePdfDownload={handlePdfDownload}
              handlePdfPreview={handlePdfPreview}
            />
          </Stack>
        </Stack>

        <CustomTable
          rows={filteredRows}
          columns={ALL_COLUMNS}
          defaultVisibleCount={visibleColumnsCount}
          emptyMessage="No records found"
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

export default SlcCertificatePage;
