'use client';

import React, { useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    IconButton,
    Switch,
    Skeleton,
    Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CustomDatePicker, CustomInput } from "../forms";



export type Column = {
    field: string;
    headerName: string;
    renderInput?: boolean;
    datePicker?: boolean;
    type?: "text" | "status" | "action";
}

interface ColumnVisibilityApi {
    visibleColumnKeys: string[];
    setVisibleColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
    columnOptions: { value: string | number; label: string }[];
}

interface Props {
    columns: Column[];
    rows: any[];

    // Checkbox
    showCheckbox?: boolean;
    selectedIds?: (number | string)[];
    onRowSelect?: (id: number | string) => void;
    onSelectAll?: (
        ids: (number | string)[],
        checked: boolean
    ) => void;

    sno?: boolean; // whether to show serial number column, defaults to true
    // Create / edit row
    enableInputRow?: boolean;
    /** when editing an existing record, this should be the row's id; null indicates create-mode */
    editingRowId?: number | string | null;
    onSave?: () => void;
    onCancel?: () => void;

    // Edit + Status handlers
    onEdit?: (row: any) => void;
    onStatusChange?: (
        id: number | string,
        checked: boolean
    ) => void;

    // Formik
    values?: any;
    errors?: any;
    touched?: any;
    handleChange?: any;
    handleBlur?: any;

    /** expose column visibility control */
    columnVisibilityApi?: (api: ColumnVisibilityApi) => void;
    defaultVisibleCount?: number;

    // optional helpers
    loading?: boolean;
    currentPage?: number;
    rowsPerPage?: number;
}

const CustomCrudTable: React.FC<Props> = ({
    columns,
    rows,
    showCheckbox = false,
    selectedIds = [],
    onRowSelect,
    onSelectAll,
    sno,
    enableInputRow,
    editingRowId,
    onSave,
    onCancel,
    onEdit,
    onStatusChange,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    columnVisibilityApi,
    defaultVisibleCount = columns.length,
    loading = false,
    currentPage = 1,
    rowsPerPage = rows.length,
}) => {
    const allIds = rows.map((r) => r.id);
    const allSelected = allIds.every((id) =>
        selectedIds.includes(id)
    );

    const skeletonRows = 8;

    /* ========== COLUMN VISIBILITY ========== */
    const [visibleColumnKeys, setVisibleColumnKeys] =
        useState<string[]>(
            columns.slice(0, defaultVisibleCount).map((c) => c.field)
        );

    const visibleColumns = columns.filter((col) =>
        visibleColumnKeys.includes(col.field)
    );

    const columnOptions = columns.map((col) => ({
        value: col.field,
        label: col.headerName,
    }));

    React.useEffect(() => {
        columnVisibilityApi?.({
            visibleColumnKeys,
            setVisibleColumnKeys,
            columnOptions,
        });
    }, [visibleColumnKeys, columnOptions]);

    return (
        <Table>
            {/* ---------- HEADER ---------- */}
            <TableHead>
                <TableRow>
                    {/* Checkbox */}
                    {showCheckbox && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={allSelected}
                                disabled={enableInputRow}
                                onChange={(e) =>
                                    onSelectAll?.(allIds, e.target.checked)
                                }
                            />
                        </TableCell>
                    )}
                    {/* S.No */}
                    {sno &&
                    <TableCell>S.No</TableCell>
                    }
                    {/* Dynamic Columns */}
                    {visibleColumns.map((col) => (
                        <TableCell key={col.field}>
                            {col.headerName}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            {/* ---------- BODY ---------- */}
            <TableBody>
                {/* INPUT ROW TOP (only for create mode) */}
                {enableInputRow && editingRowId == null && (
                    <TableRow>

                        {/* Checkbox column */}
                        {showCheckbox && <TableCell />}

                        {/* S.No */}
                        {sno &&
                        <TableCell>#</TableCell>
                        }

                        {/* Render all columns for input row so actions show even when hidden */}
                        {columns.map((col) => {
                            // ---------- ACTION COLUMN ----------
                            if (col.type === "action") {
                                return (
                                    <TableCell key={col.field}>
                                        <CheckIcon color="success" onClick={onSave} />
                                        <CloseIcon color="error" onClick={onCancel} />
                                    </TableCell>
                                );
                            }

                            // ---------- STATUS INPUT (create) ----------
                            if (col.type === "status") {
                                return (
                                    <TableCell key={col.field}>
                                        <Switch
                                            checked={
                                                values?.[col.field] === "Active" ||
                                                values?.[col.field] === true
                                            }
                                            onChange={(e) =>
                                                handleChange({
                                                    target: {
                                                        name: col.field,
                                                        value: e.target.checked
                                                            ? "Active"
                                                            : "Inactive",
                                                    },
                                                })
                                            }
                                        />
                                    </TableCell>
                                );
                            }

                            // ---------- INPUT FIELDS ----------
                            if (col.renderInput) {
                                return (
                                    <TableCell key={col.field}>
                                        <CustomInput
                                            id={col.field}
                                            name={col.field}
                                            label={col.headerName}
                                            value={values?.[col.field]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors?.[col.field]}
                                            touched={touched?.[col.field]}
                                        />
                                    </TableCell>
                                );
                            }

                            // ---------- DATE PICKER FIELDS ----------
                            if (col.datePicker) {
                                return (
                                    <TableCell key={col.field}>
                                        <CustomDatePicker
                                            id={col.field}
                                            name={col.field}
                                            label={col.headerName}
                                        />
                                    </TableCell>
                                );
                            }

                            // ---------- EMPTY CELL ----------
                            return <TableCell key={col.field} />;
                        })}

                    </TableRow>
                )}


                {/* LIST ROWS */}
                {loading
                    ? Array.from({ length: skeletonRows }).map((_, rIdx) => (
                        <TableRow key={`skeleton-${rIdx}`}>
                            {showCheckbox && (
                                <TableCell padding="checkbox">
                                    <Skeleton variant="rectangular" width={18} height={18} />
                                </TableCell>
                            )}

                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            {visibleColumns.map((col, cIdx) => (
                                <TableCell key={`sk-${cIdx}`}>
                                    <Skeleton variant="text" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                    : rows.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={
                                    visibleColumns.length + (showCheckbox ? 1 : 0)
                                }
                                align="center"
                                sx={{ py: 4 }}
                            >
                                No records to display
                            </TableCell>
                        </TableRow>
                    ) : rows.map((row, index) => (
                        <TableRow key={row.id+index}>
                            {showCheckbox && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedIds.includes(
                                            row.id
                                        )}
                                        disabled={enableInputRow}
                                        onChange={() =>
                                            onRowSelect?.(row.id)
                                        }
                                    />
                                </TableCell>
                            )}
                            {sno &&
                                <TableCell>
                                    {enableInputRow
                                        ? index + 2
                                        : index + 1}
                                </TableCell>

                            }
                            {visibleColumns.map((col) => {
                                // ---------- STATUS ----------
                                if (col.type === "status") {
                                    // if this row is currently being edited, render switch bound to formik
                                    if (enableInputRow && editingRowId === row.id) {
                                        return (
                                            <TableCell key={col.field}>
                                                <Switch
                                                    checked={
                                                        values?.[col.field] === "Active" ||
                                                        values?.[col.field] === true
                                                    }
                                                    onChange={(e) =>
                                                        handleChange({
                                                            target: {
                                                                name: col.field,
                                                                value: e.target.checked
                                                                    ? "Active"
                                                                    : "Inactive",
                                                            },
                                                        })
                                                    }
                                                />
                                            </TableCell>
                                        );
                                    }

                                    return (
                                        <TableCell key={col.field}>
                                            <Switch
                                                checked={
                                                    row[col.field] === "Active"
                                                }
                                                onChange={(e) =>
                                                    onStatusChange?.(
                                                        row.id,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    );
                                }

                                // ---------- ACTION ----------
                                if (col.type === "action") {
                                    // if input row open for another record, disable buttons
                                    const disableEdit =
                                        enableInputRow && editingRowId !== row.id;
                                    if (enableInputRow && editingRowId === row.id) {
                                        return (

                                            <TableCell key={col.field}>
                                                <Stack direction="row" spacing={1}>
                                                    <IconButton
                                                        color="success"
                                                        onClick={onSave}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <CheckIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={onCancel}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>

                                        );
                                    }
                                    return (
                                        <TableCell key={col.field}>
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    onEdit?.(row)
                                                }
                                                disabled={disableEdit}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    );
                                }

                                // ---------- DEFAULT TEXT or INPUT IF THIS ROW IS BEING EDITED ----------
                                if (enableInputRow && editingRowId === row.id && col.renderInput) {
                                    return (
                                        <TableCell key={col.field}>
                                            <CustomInput
                                                id={col.field}
                                                name={col.field}
                                                label={col.headerName}
                                                value={values?.[col.field]}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors?.[col.field]}
                                                touched={touched?.[col.field]}
                                            />
                                        </TableCell>
                                    );
                                }

                                // ---------- DEFAULT TEXT ----------
                                return (
                                    <TableCell key={col.field}>
                                        {row[col.field]}
                                    </TableCell>
                                );
                            })}

                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default CustomCrudTable;
