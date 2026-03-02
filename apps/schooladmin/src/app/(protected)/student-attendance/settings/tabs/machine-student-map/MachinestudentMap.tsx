'use client';

import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import {
    Box,
    Paper,
    useTheme,
    TablePagination,
    Pagination,
    Chip,
    IconButton,
    Stack,
} from "@mui/material";

import { Eye, Pencil, Trash2 } from 'lucide-react';

import { CustomSelect, CustomMultiSelect } from "@/modules/shared/components/forms";
import { useMachineStudentMapLogic } from './machineStudentMap.logic';
import ActionButton from "@/modules/shared/ActionButton";
import ExportActions from '@/modules/shared/components/customfilters/ExportActions';
import { CustomTable } from '@/modules/shared/components/customtable';
import { ColumnDef } from '@/modules/shared/components/customtable/type';
import {NoDataFound} from "@/modules/shared/components/nodatafound";
import { toast } from "react-toastify";

/* ---------------- TYPES ---------------- */

interface Student {
    id: number;
    first_name: string;
    email: string;
    mobile?: string;
    role?: string;
    status?: string;
}
/* ---------------- COMPONENT ---------------- */

export const MachineStudentMap = () => {
    const theme = useTheme();
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
    setSelectedIds,
    handleRowSelect,
    handleSelectAll,

    // PDF
    handlePdfDownload,
    handlePdfPreview,
    } = useMachineStudentMapLogic();

    /* ---------------- COLUMNS ---------------- */

    const ALL_COLUMNS: ColumnDef<Student>[] = [
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

    /* ---------------- STATES ---------------- */
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        ALL_COLUMNS.slice(0, visibleColumnsCount).map(c => String(c.key))
    );

    // store column API
    const columnApiRef = useRef<{
        visibleColumnKeys: (keyof Student | string)[];
        setVisibleColumnKeys: React.Dispatch<React.SetStateAction<(keyof Student | string)[]>>;
        columnOptions: { value: string | number; label: string }[];
    } | null>(null);

    const defaultColumnOptions = ALL_COLUMNS.map(c => ({ value: c.key as string, label: c.label }));



    const [mappedData, setMappedData] = useState<Student[]>([]);

    const [filterClicked, setFilterClicked] = useState(false);
    const [showCreateTable, setShowCreateTable] = useState(false);
    const [machineId, setMachineId] = useState("");


 

    /* ---------------- FILTER ---------------- */

    const handleFilter = (values: any) => {
        const selectedMachine = values.machineId;

        setMachineId(selectedMachine);
        setFilterClicked(true);
        setShowCreateTable(false);

        /* 🔹 apply to server filters as 'first_name' for now */
        applyFilters({ first_name: selectedMachine });

        // 👉 Fake mapped response
        const alreadyMapped: Student[] = []; // replace API

        setMappedData(alreadyMapped);
    };

    /* ---------------- CREATE ---------------- */

    const handleCreate = () => {
        setShowCreateTable(true);
    };

    /* ---------------- CANCEL ---------------- */

    const handleCancel = () => {
        setShowCreateTable(false);
        setSelectedIds([]);
    };

    /* ---------------- SAVE ---------------- */

    const handleSave = async () => {
        if (selectedIds.length === 0) {
            alert("Please select at least one row");
            return;
        }

        /* 🔹 SAVE API */

        const responseMapped =
            data?.userList?.filter((row: any) =>
                selectedIds.includes(row.id)
            ) || [];

        setMappedData(responseMapped);
        setShowCreateTable(false);
        setSelectedIds([]);
        toast.success("Selected Data Mapped successful")
    };

    /* ---------------- FORMIK ---------------- */

    const initialValues = { machineId: "" };

    const validationSchema = Yup.object({
        machineId: Yup.string().required("Machine Id required"),
    });

    /* ---------------- UI ---------------- */

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
                border: "1px solid",
                borderColor: theme.palette.divider,
                flex: 1
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFilter}
            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <Box>

                        {/* ---------------- FILTER ---------------- */}

                        <Box display="flex" justifyContent="space-between">

                            <CustomSelect
                                id="machineId"
                                name="machineId"
                                value={values.machineId}
                                options={[
                                    { label: "Select Machine Id", value: "" },
                                    {
                                        label: "89748913 (mcs9382)",
                                        value: "89748913",
                                    },
                                    {
                                        label: "89748914 (mcs9383)",
                                        value: "89748914",
                                    },
                                ]}
                                onChange={(val: any) => {
                                    const value =
                                        val?.target?.value ??
                                        val?.value ??
                                        val;

                                    setFieldValue("machineId", value);
                                }}
                            />

                            <ActionButton
                                variant="contained"
                                label="Filter"
                                clickHandler={handleSubmit}
                            />
                        </Box>


                        {/* ---------------- CREATE BUTTON (ALWAYS AFTER FILTER) ---------------- */}

                        {filterClicked && !showCreateTable && (
                            <Box textAlign="right" mt={2}>
                                <ActionButton
                                    variant="contained"
                                    label="Create"
                                    clickHandler={handleCreate}
                                />
                            </Box>
                        )}

                        {/* ---------------- NO DATA ---------------- */}

                        {filterClicked &&
                            mappedData.length === 0 &&
                            !showCreateTable && (
                                <Box textAlign="center" py={8}>
                                    <NoDataFound />
                                </Box>
                            )}

                        {/* ---------------- CREATE TABLE ---------------- */}

                        {showCreateTable && (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    gap={2}
                                    mb={2}
                                >
                                    <ActionButton
                                        label="Cancel"
                                        variant="outlined"
                                        clickHandler={handleCancel}
                                    />

                                    <ActionButton

                                        label="Save"
                                        variant="contained"
                                        clickHandler={handleSave}
                                    />
                                </Box>

                                <Box px={2} mb={1}>
                                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <CustomMultiSelect
                                      id="column-visibility-create"
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

                                    <Stack direction="row" spacing={1}>
                                      <ExportActions
                                        onExport={(type) => exportData(type)}
                                        loading={loading}
                                        handlePdfDownload={handlePdfDownload}
                                        handlePdfPreview={handlePdfPreview}
                                      />
                                    </Stack>
                                  </Stack>
                                </Box>

                                <CustomTable
                                    rows={data.userList ? data.userList : []}
                                    columns={ALL_COLUMNS}
                                    defaultVisibleCount={visibleColumnsCount}
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
                                    checkboxSelection

                                />

                                <Box display="flex" justifyContent="space-between" mt={2}>
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
                            </>
                        )}

                        {/* ---------------- MAPPED TABLE ---------------- */}

                        {mappedData.length > 0 &&
                            !showCreateTable && (
                                <>
                                    <Box fontWeight={600} mb={2}>
                                        Mapped Records
                                    </Box>

                                    {/* toolbar for mapped table */}
                                    <Box px={2} mb={1}>
                                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <CustomMultiSelect
                                          id="column-visibility-mapped"
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

                                        <Stack direction="row" spacing={1}>
                                          <ExportActions
                                            onExport={(type) => exportData(type)}
                                            loading={loading}
                                            handlePdfDownload={handlePdfDownload}
                                            handlePdfPreview={handlePdfPreview}
                                          />
                                        </Stack>
                                      </Stack>
                                    </Box>

                                    <CustomTable
                                        rows={data.userList ? data.userList : []}
                                        columns={ALL_COLUMNS}
                                        defaultVisibleCount={visibleColumnsCount}
                                        currentPage={pagination.page}
                                        rowsPerPage={pagination.limit}
                                        loading={loading}
                                    
                                        columnVisibilityApi={(api) => {
                                          columnApiRef.current = api;
                                          setVisibleColumns(api.visibleColumnKeys as string[]);
                                        }}

                                    />

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <TablePagination
                                            component="div"
                                            count={pagination.total}
                                            page={pagination.page - 1}
                                            rowsPerPage={pagination.limit}
                                            onPageChange={(_, p) =>
                                                changePage(p + 1)
                                            }
                                            onRowsPerPageChange={(e) =>
                                                changeLimit(
                                                    parseInt(
                                                        e.target.value,
                                                        10
                                                    )
                                                )
                                            }
                                        />

                                        <Pagination
                                            count={Math.ceil(
                                                pagination.total /
                                                pagination.limit
                                            )}
                                            page={pagination.page}
                                            onChange={(_, v) =>
                                                changePage(v)
                                            }
                                        />
                                    </Box>
                                </>
                            )}

                    </Box>
                )}
            </Formik>
        </Paper>
    );
};
