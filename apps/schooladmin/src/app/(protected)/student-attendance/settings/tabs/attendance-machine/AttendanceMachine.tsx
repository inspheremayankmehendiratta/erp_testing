'use client';

import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
    Button,
    Paper,
    useTheme,
    Box,
    IconButton,
    Stack,
    Popover,
    Pagination,
    TablePagination,
} from "@mui/material";
import CustomCrudTable, { Column } from "@/modules/shared/components/customtable/CustomCrudTable";

import ExportActions from "@/modules/shared/components/customfilters/ExportActions";
import { CustomMultiSelect } from "@/modules/shared/components/forms";

import { Filter } from "lucide-react";
import CustomFilters from "./AttendanceMachineFilters";
import { useAttendanceMachineLogic } from "./AttendanceMachine.logic";

export const AttendanceMachine = () => {
    const theme = useTheme();

    // ---------- BUSINESS LOGIC HOOK ----------
    const {
        data,
        loading,
        pagination,
        filterValues,
        applyFilters,
        changePage,
        changeLimit,
        selectedIds,
        handleRowSelect,
        handleSelectAll,
        handlePdfDownload,
        handlePdfPreview,
        fileLabel,
        visibleColumnsCount,
        exportData
    } = useAttendanceMachineLogic();

    // local copy for inline-create rows; start with fetch data if available
    const [rows, setRows] = useState<any[]>(data?.list || [
        {
            id: 1,
            first_name: "3891748912",
            email: "example@domain.com",
            mobile: "8247jc0",
            role: "192.16.1.1",
            status: "Active",
            action: "Edit",
        },
    ]);

    useEffect(() => {
        const fetched = data?.userList ?? data?.list ?? [];
        if (Array.isArray(fetched) && fetched.length > 0) {
            const normalized = fetched.map((r: any) => ({
                id: r.id ?? r._id ?? Date.now(),
                first_name: r.first_name ?? "",
                email: r.email ?? r.modal ?? "",
                mobile: r.mobile ?? "",
                role: r.role ?? "",
                status: r.status ?? "",
                action: r.action ?? "Edit",
                ...r,
            }));
            setRows(normalized);
        }
    }, [data]);

    // ---------- INPUT ROW TOGGLE ----------
    const [enableInputRow, setEnableInputRow] =
        useState(false);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const formikRef = useRef<any>(null);

    // ---------- COLUMNS ----------
    const columns: Column[] = [
      {
        field: "first_name",
        headerName: "Machine Code",
        renderInput: true,
      },
      {
        field: "email",
        headerName: "Modal",
        renderInput: true,
      },
      {
        field: "mobile",
        headerName: "Location",
        renderInput: true,
      },
      {
        field: "role",
        headerName: "IP Address",
        renderInput: true,
      },
      {
        field: "status",
        headerName: "Status",
        type: "status",
      },
      {
        field: "action",
        headerName: "Action",
        type: "action",
      },
    ];

    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        columns.map((c) => c.field)
    );
    const columnApiRef = useRef<any>(null);

    const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);

    const initialValues = {
        first_name: "",
        email: "",
        mobile: "",
        role: "",
    };

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        mobile: Yup.string().required("Required"),
        role: Yup.string().required("Required"),
    });

    const handleSave = async (
        values: any,
        { resetForm }: any
    ) => {
        console.log("Form Values:", values);

        if (editingRowId !== null) {
            setRows((prev) =>
                prev.map((r) =>
                    r.id === editingRowId
                        ? {
                              ...r,
                              first_name: values.first_name,
                              email: values.email,
                              mobile: values.mobile,
                              role: values.role,
                          }
                        : r
                )
            );
            setEditingRowId(null);
            toast.success("Record updated successfully");
        } else {
            toast.success("Record created successfully");
            const newRow = {
                id: Date.now(),
                first_name: values.first_name,
                email: values.email,
                mobile: values.mobile,
                role: values.role,
                status: "Active",
                action: "Edit",
            };

            setRows((prev) => [...prev, newRow]);
        }

        setEnableInputRow(false);
        resetForm();
    };

    const handleStatusChange = (
        id: number | string,
        checked: boolean
    ) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        status: checked
                            ? "Active"
                            : "Inactive",
                    }
                    : row
            )
        );
    };

    const handleEdit = (row: any) => {
        if (enableInputRow && editingRowId !== row.id) {
            toast.error("Please save or cancel the open row before editing another record.");
            return;
        }
        formikRef.current?.setValues({
            first_name: row.first_name,
            email: row.email,
            mobile: row.mobile,
            role: row.role,
        });
        setEnableInputRow(true);
        setEditingRowId(row.id);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                border: "1px solid",
                borderColor: theme.palette.divider,
                flex: 1,
            }}
        >
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSave}
            >
                {(formik) => (
                    <Box>


                        {/* ===== ACTION BAR (filters, exports, columns) ===== */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            px={2}
                            mb={1}
                        >
                            <CustomMultiSelect
                                id="column-visibility"
                                name="columnVisibility"
                                value={visibleColumns}
                                options={
                                    columnApiRef.current?.columnOptions ??
                                    columns.map((c) => ({ value: c.field, label: c.headerName }))
                                }
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
                                    slotProps={{
                                        paper: { sx: { width: 420, p: 2 } },
                                    }}
                                >
                                    <CustomFilters
                                        filterValues={filterValues}
                                        onApply={(values) => {
                                            applyFilters(values);
                                            setShowFilters(null);
                                        }}
                                    />
                                </Popover>
                                {/* CREATE BUTTON */}
                                <Button
                                variant="contained"
                                disabled={enableInputRow}
                                onClick={() => {
                                    setEditingRowId(null);
                                    setEnableInputRow(true);
                                }}
                                sx={{ ml: 2 }}
                            >
                                Create
                            </Button>
                            </Stack>
                        </Stack>

                        {/* TABLE */}
                        <CustomCrudTable
                            columns={columns}
                            rows={rows}
                            showCheckbox
                            selectedIds={selectedIds}
                            loading={loading}
                            currentPage={pagination.page}
                            rowsPerPage={pagination.limit}
                            onRowSelect={handleRowSelect}
                            onSelectAll={handleSelectAll}
                            enableInputRow={enableInputRow}
                            editingRowId={editingRowId}
                            onSave={formik.handleSubmit}
                            onCancel={() => {
                                setEnableInputRow(false);
                                setEditingRowId(null);
                                formik.resetForm();
                            }}
                            onEdit={handleEdit}
                            onStatusChange={handleStatusChange}
                            columnVisibilityApi={(api) => {
                                columnApiRef.current = api;
                                setVisibleColumns(api.visibleColumnKeys as string[]);
                            }}
                            defaultVisibleCount={columns.length} // always show all columns initially
                            {...formik}
                        />

                        {/* ===== PAGINATION ===== */}
                        {rows.length > 0 && (
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} px={2}>
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
                        )}
                    </Box>
                )}
            </Formik>
        </Paper>
    );
};

export default AttendanceMachine;