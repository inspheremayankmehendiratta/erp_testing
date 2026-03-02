
'use client';


import CustomFilters from "./partials/Filters";

import { CustomDatePicker, CustomInput, CustomMultiSelect, CustomSelect } from "@/modules/shared/components/forms";
import { Breadcrumbs, PageHeader } from "@/modules/shared/components/sectionhead";


import { Box, Button, Chip, Grid, IconButton, Pagination, Paper, Popover, Stack, TablePagination, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { Eye, Filter, Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { School } from './leaves.types';
import { useLeavesLogic } from './leaves.logic';
import { ColumnDef } from "@/modules/shared/components/customtable/type";
import { CustomCard } from "@/modules/shared/components/customcard";
import { CustomTable } from "@/modules/shared/components/customtable";
import ExportActions from "@/modules/shared/components/customfilters/ExportActions";
import { CustomModal } from "@/modules/shared/components/custommodal";
import { APP_URL } from "@/modules/shared/config/constants";

const breadcrumbItems = [
  { label: 'Dashboard', path: APP_URL.DASHBOARD },
  { label: 'Student Attendance', path: '#' },
  { label: 'Leaves', path: '#' },
];

const counters = [
  { label: 'Total', value: 2, percent: 100 },
  { label: 'Medical', value: 0, percent: 0 },
  { label: 'Sports', value: 1, percent: 50 },
  { label: 'Leave', value: 1, percent: 50 },
  { label: 'Pending', value: 2, percent: 100 },
];

interface CounterItem {
  label: string;
  value: number;
  percent: number;
  color?: string;
}

const circleSize = 72;
const stroke = 6;
const radius = (circleSize - stroke) / 2;
const circumference = 2 * Math.PI * radius;
const Leaves = () => {
  const theme = useTheme();

  // table logic handled by hook below
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

    showFilters,
    setShowFilters,

    markAs,
    handleOpenMark,
    handleCloseMark,
    handleBulkAction,

    visibleColumnsCount,
  } = useLeavesLogic();
  const [createModal, setCreateModal] = useState(false);



  const hasSelection = selectedIds.length > 0;


  const ALL_COLUMNS: ColumnDef<School>[] = [
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
    visibleColumnKeys: (keyof School | string)[];
    setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof School | string)[]>>;
    columnOptions: { value: string | number; label: string }[];
  } | null>(null);

  const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));

 const handleApply = () => {
    setCreateModal(true)
  }


 


  return (
    <>  <Box>
      <Breadcrumbs items={breadcrumbItems} />
      <PageHeader
        title="Leaves"
        buttonLabel="Apply"
        clickHandler={() => handleApply()}
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

          <Stack direction="row" spacing={1} alignItems="center">
            {/* FILTER BUTTON */}
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
              <CustomFilters
                filterValues={filterValues}
                onApply={(vals) => {
                  applyFilters(vals);
                  setShowFilters(null);
                }}
              />
            </Popover>

            {/* ===== EXPORT ===== */}
            <ExportActions
              onExport={(type) => exportData(type)}
              loading={loading}
            />

            {/* ===== MARK ALL (Only when rows selected) ===== */}
            {hasSelection && (
              <>
                <Button
                  variant="contained"
                  onClick={handleOpenMark}
                  sx={{
                    bgcolor: '#F4B400',
                    color: '#000',
                    fontWeight: 600,
                    px: 2.5,
                    borderRadius: '10px',
                    '&:hover': { bgcolor: '#E0A800' },
                  }}
                >
                  Mark All
                </Button>

                {/* ===== POPOVER ===== */}
                <Popover
                  open={Boolean(markAs)}
                  anchorEl={markAs}
                  onClose={handleCloseMark}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        p: 2,
                        borderRadius: '14px',
                        minWidth: 220,
                      },
                    },
                  }}
                >
                  <Stack spacing={2}>

                    {/* APPROVE */}
                    <Button
                      fullWidth
                      onClick={() =>
                        handleBulkAction('approve')
                      }
                      sx={{
                        bgcolor: '#66BB6A',
                        color: '#fff',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: '10px',
                        '&:hover': {
                          bgcolor: '#57A05A',
                        },
                      }}
                    >
                      Approve All
                    </Button>

                    {/* REJECT */}
                    <Button
                      fullWidth
                      onClick={() =>
                        handleBulkAction('reject')
                      }
                      sx={{
                        bgcolor: '#EF5350',
                        color: '#fff',
                        fontWeight: 600,
                        py: 1.2,
                        borderRadius: '10px',
                        '&:hover': {
                          bgcolor: '#D84343',
                        },
                      }}
                    >
                      Reject All
                    </Button>

                  </Stack>
                </Popover>
              </>
            )}
          </Stack>


        </Stack>

        {/* ===== Table ===== */}
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
      {createModal && (
        <CustomModal
          open={createModal}
          onClose={() => setCreateModal(false)}
          title="Apply Leave"
          width={700}
          footer={null}
        >
          <Formik
            initialValues={{
              classSection: '',
              admissionNo: '',
              studentName: '',
              leaveType: '',
              fromDate: null,
              toDate: null,
              remark: '',
            }}
            validate={(values) => {
              const errors: any = {};

              if (!values.classSection)
                errors.classSection = 'Required';

              if (!values.admissionNo)
                errors.admissionNo = 'Required';

              if (!values.leaveType)
                errors.leaveType = 'Required';

              if (!values.fromDate)
                errors.fromDate = 'Required';

              if (!values.toDate)
                errors.toDate = 'Required';

              if (!values.remark)
                errors.remark = 'Required';

              return errors;
            }}
            onSubmit={(values) => {
              console.log('Apply Leave Payload →', values);
              setCreateModal(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                {/* ================= GRID ================= */}
                <Grid container spacing={3} mt={1}>

                  {/* Class Section */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomSelect
                      id="classSection"
                      name="classSection"
                      label="Select Class-Section *"
                      value={values.classSection}
                      options={[
                        { label: 'Class 10 A', value: '10A' },
                        { label: 'Class 10 B', value: '10B' },
                      ]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.classSection}
                      touched={touched.classSection}
                      placeholder="Select Class-Section"
                    />
                  </Grid>

                  {/* Admission No */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomSelect
                      id="admissionNo"
                      name="admissionNo"
                      label="Select Admission No. *"
                      value={values.admissionNo}
                      options={[
                        { label: 'ADM001', value: 'ADM001' },
                        { label: 'ADM002', value: 'ADM002' },
                      ]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.admissionNo}
                      touched={touched.admissionNo}
                      placeholder="Select Admission No."
                    />
                  </Grid>

                  {/* Student Name */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomInput
                      id="studentName"
                      name="studentName"
                      label="Student Name"
                      value={values.studentName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Student Name"
                    />
                  </Grid>

                  {/* Leave Type */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomSelect
                      id="leaveType"
                      name="leaveType"
                      label="Select Leave Type *"
                      value={values.leaveType}
                      options={[
                        { label: 'Medical', value: 'medical' },
                        { label: 'Sports', value: 'sports' },
                        { label: 'Personal', value: 'personal' },
                      ]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.leaveType}
                      touched={touched.leaveType}
                      placeholder="Select Leave Type"
                    />
                  </Grid>

                  {/* From Date */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomDatePicker
                      id="fromDate"
                      name="fromDate"
                      label="From Date *"

                    />
                  </Grid>

                  {/* To Date */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomDatePicker
                      id="toDate"
                      name="toDate"
                      label="To Date *"

                    />
                  </Grid>

                  {/* Remark */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomSelect
                      id="remark"
                      name="remark"
                      label="Select Remark *"
                      value={values.remark}
                      options={[
                        { label: 'Sick Leave', value: 'sick' },
                        { label: 'Family Function', value: 'family' },
                        { label: 'Other', value: 'other' },
                      ]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.remark}
                      touched={touched.remark}
                      placeholder="Select Remark"
                    />
                  </Grid>
                </Grid>

                {/* ===== Required Text ===== */}
                <Typography
                  mt={2}
                  fontSize={13}
                  color="error.main"
                >
                  * indicates the required field.
                </Typography>

                {/* ===== Footer Buttons ===== */}
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={2}
                  mt={4}
                >
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

export default Leaves;