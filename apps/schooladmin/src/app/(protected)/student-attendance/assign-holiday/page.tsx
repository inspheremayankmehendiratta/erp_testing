'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
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
import {
  Eye,
  Filter,
  Pencil,
  Trash2,
} from 'lucide-react';


import { Form, Formik } from 'formik';

import { AssignHolidayRow } from './assignHoliday.types';
import { useAssignHolidayLogic } from './assignHoliday.logic';
import { APP_URL } from '@/modules/shared/config/constants';
import { Breadcrumbs, PageHeader } from '@/modules/shared/components/sectionhead';
import { CustomMultiSelect } from '@/modules/shared/components/forms';
import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import CustomFilters from './partials/Filters';
import { CustomTable } from '@/modules/shared/components/customtable';
import { CustomModal } from '@/modules/shared/components/custommodal';
import { ColumnDef } from '@/modules/shared/components/customtable/type';



const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Assign Holiday', path: '#' },
];

const AssignHoliday = () => {
  const theme = useTheme();

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
    visibleColumnsCount,
  } = useAssignHolidayLogic();

  const [createModal, setCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
  // ================= COLUMN VISIBILITY =================
  const ALL_COLUMNS: ColumnDef<AssignHolidayRow>[] = [
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
          <IconButton size="small">
            <Eye size={16} />
          </IconButton>
          <IconButton size="small">
            <Pencil size={16} />
          </IconButton>
          <IconButton size="small" color="error">
            <Trash2 size={16} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    ALL_COLUMNS.slice(0, visibleColumnsCount).map(c => String(c.key))
  );

  // store column API
  const columnApiRef = useRef<{
    visibleColumnKeys: (keyof AssignHolidayRow | string)[];
    setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof AssignHolidayRow | string)[]>>;
    columnOptions: { value: string | number; label: string }[];
  } | null>(null);

  const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));




  const hnadleCreate = () => {
    setCreateModal(true)
  }
  return (
    <>
      <Box>


        {/* ===== Breadcrumbs & Header ===== */}
        <Box mb={3}>
          <Breadcrumbs items={breadcrumbItems} />
          <PageHeader
            title="Assign Holiday"
            buttonLabel="Create"
            clickHandler={() => hnadleCreate()}
          />
        </Box>

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
                  onApply={(vals) => {
                    applyFilters(vals);
                    setShowFilters(null);
                  }}
                />
              </Popover>
            </Stack>
          </Stack>

          {/* ===== Table ===== */}
          <Box mb={2}>
            <CustomTable
              rows={data.userList ? data.userList : []}
              columns={ALL_COLUMNS}
              defaultVisibleCount={visibleColumnsCount}
              selectedIds={selectedIds}
              onRowSelect={handleRowSelect}
              onSelectAll={handleSelectAll}
              columnVisibilityApi={(api) => {
                columnApiRef.current = api;
                setVisibleColumns(api.visibleColumnKeys as string[]);
              }}
              emptyMessage="No records found"

            />

          </Box>

          {/* ===== Pagination ===== */}
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
        </Paper>
      </Box>
      {createModal && (
        <CustomModal
          open={createModal}
          onClose={() => setCreateModal(false)}
          title="Assign Holiday"
          width={700}
          footer={null}
        >
          <Formik
            initialValues={{
              classSections: [] as string[],
              holidays: [] as string[],
            }}
            validate={(values) => {
              const errors: any = {};

              if (!values.classSections.length) {
                errors.classSections = 'Required';
              }

              if (!values.holidays.length) {
                errors.holidays = 'Required';
              }

              return errors;
            }}
            onSubmit={(values) => {
              console.log(values, 'Assign Holiday Payload');

              /**
               * Example payload:
               * {
               *   classSections: ['10A','10B'],
               *   holidays: ['diwali','holi']
               * }
               */

              setCreateModal(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                {/* ================= Fields ================= */}
                <Grid container spacing={3} mt={1}>

                  {/* ================= Class Section Multi ================= */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomMultiSelect
                      id="classSections"
                      name="classSections"
                      label="Select Class Section *"

                      value={values.classSections}
                      options={[
                        { label: 'Class 10 A', value: '10A' },
                        { label: 'Class 10 B', value: '10B' },
                        { label: 'Class 9 A', value: '9A' },
                      ]}
                      placeholder="Select Class Section"
                      onChange={(e) =>
                        setFieldValue(
                          'classSections',
                          e.target.value
                        )
                      }
                      touched={touched.classSections}
                    />
                  </Grid>

                  {/* ================= Holidays Multi ================= */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomMultiSelect
                      id="holidays"
                      name="holidays"
                      label="Select Holidays *"
                      value={values.holidays}
                      options={[
                        { label: 'Diwali', value: 'diwali' },
                        { label: 'Holi', value: 'holi' },
                        { label: 'Christmas', value: 'christmas' },
                        { label: 'Eid', value: 'eid' },
                      ]}
                      placeholder="Select Holidays"
                      onChange={(e) =>
                        setFieldValue(
                          'holidays',
                          e.target.value
                        )
                      }
                      touched={touched.holidays}
                    />
                  </Grid>

                </Grid>

                {/* ================= Helper Text ================= */}
                <Typography
                  mt={2}
                  fontSize={13}
                  color="error.main"
                >
                  * indicates the required field.
                </Typography>

                {/* ================= Footer Buttons ================= */}
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  mt={4}
                >
                  {/* Close */}
                  <Button
                    onClick={() => setCreateModal(false)}
                    sx={{
                      bgcolor: '#E0E0E0',
                      color: '#555',
                      px: 4,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#D5D5D5' },
                    }}
                  >
                    Close
                  </Button>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#F4B400',
                      color: '#000',
                      fontWeight: 600,
                      px: 4,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#E0A800' },
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </CustomModal>
      )}


    </>
  );
};

export default AssignHoliday;
