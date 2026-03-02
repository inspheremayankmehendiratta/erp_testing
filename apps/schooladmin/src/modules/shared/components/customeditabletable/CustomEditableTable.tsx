"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Skeleton
} from "@mui/material";

import React, { memo, useMemo, useState } from "react";
import { ColumnDef } from "./type";


/* ================= TYPES ================= */

export interface ColumnVisibilityApi<T> {
  visibleColumnKeys: (keyof T | string)[];
  setVisibleColumnKeys: React.Dispatch<
    React.SetStateAction<(keyof T | string)[]>
  >;
  columnOptions: { value: string | number; label: string }[];
}

interface CustomEditableTableProps<T extends { id: number | string }> {
  rows: T[];
  columns: ColumnDef<T>[];
  checkboxSelection?: boolean;
  selectedIds?: (number | string)[];
  onRowSelect?: (id: number | string, row: T) => void;
  onSelectAll?: (ids: (number | string)[], checked: boolean) => void;

  /** NEW: expose column visibility control */
  columnVisibilityApi?: (api: ColumnVisibilityApi<T>) => void;

  /** default visible columns */
  defaultVisibleCount?: number;
  currentPage?: number;
  rowsPerPage?: number;
  loading?: boolean; 
  disabledRowIds?: (number | string)[];
  isRowDisabled?: (row: T) => boolean;
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify';
  lastColumnAlign?: 'left' | 'center' | 'right' | 'inherit' | 'justify';
  numericColumns?: string[];
}

/* ================= COMPONENT ================= */

function CustomTableComponent<T extends { id: number | string }>({
  rows,
  columns,
  checkboxSelection = false,
  selectedIds = [],
  onRowSelect,
  onSelectAll,
  columnVisibilityApi,
  defaultVisibleCount,
  currentPage = 1,
  rowsPerPage = rows.length,
  loading = false,
  disabledRowIds = [],
  isRowDisabled,
  align = 'left',
  lastColumnAlign = 'right',
  numericColumns = ['id', 'serialNo'],
}: CustomEditableTableProps<T>) {

  const skeletonRows = 10;

  /* ========== COLUMN VISIBILITY LOGIC ========== */

  const [visibleColumnKeys, setVisibleColumnKeys] = useState<
    (keyof T | string)[]
  >(columns.slice(0, defaultVisibleCount).map(col => col.key));

  const visibleColumns = useMemo(
    () => columns.filter(col => visibleColumnKeys.includes(col.key)),
    [columns, visibleColumnKeys]
  );

  const columnOptions = useMemo(
    () =>
      columns.map(col => ({
        value: col.key as string | number,
        label: col.label,
      })),
    [columns]
  );


  /* expose api to parent */
  React.useEffect(() => {
    columnVisibilityApi?.({
      visibleColumnKeys,
      setVisibleColumnKeys: (updater) => {
        setVisibleColumnKeys(updater);
      },
      columnOptions,
    });
  }, [visibleColumnKeys, columnOptions, columnVisibilityApi]);

    // Filter out disabled rows from selectable rows
  const selectableRows = useMemo(() => {
    if (isRowDisabled) {
      return rows.filter(row => !isRowDisabled(row));
    }
    if (disabledRowIds.length > 0) {
      return rows.filter(row => !disabledRowIds.includes(row.id));
    }
    return rows;
  }, [rows, disabledRowIds, isRowDisabled]);

  const selectableIds = selectableRows.map(r => r.id);

  const isSelected = (id: number | string) => selectedIds.includes(id);

  const isRowDisabledCheck = (row: T): boolean => {
    if (isRowDisabled) {
      return isRowDisabled(row);
    }
    return disabledRowIds.includes(row.id);
  };

  const allIds = rows.map(r => r.id);

  const allSelected = selectableRows.length > 0 && selectableIds.every(id => selectedIds.includes(id));

  const indeterminate = selectedIds.length > 0 && selectedIds.length < selectableRows.length;

  const getCellAlignment = (colKey: string | keyof T, index: number): 'left' | 'center' | 'right' | 'inherit' | 'justify' => {
    // Last column gets special alignment
    if (index === visibleColumns.length - 1) {
      return lastColumnAlign;
    }

    // Check if column is numeric (should be right-aligned)
    if (numericColumns.includes(colKey as string)) {
      return 'right';
    }
    return align;
  };

  /* ================= RENDER ================= */
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 0,
        margin: 0,
        border: "none",
        borderTop: "1px solid var(--mui-palette-divider)",
      }}
    >
      <Table>
        {/* ===== HEAD ===== */}
        <TableHead>
          <TableRow>
            {checkboxSelection && (
              <TableCell padding="checkbox" align="center">
                <Checkbox
                  checked={allSelected}
                  indeterminate={indeterminate}
                  onChange={(e) =>
                    onSelectAll?.(selectableIds, e.target.checked)
                  }
                  disabled={selectableRows.length === 0}
                />
              </TableCell>
            )}

            {visibleColumns.map((col, index) => {
              const alignment = getCellAlignment(col.key, index);
              
              return (
                <TableCell
                  key={String(col.key)}
                  align={alignment}
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    width: col.width,
                  }}
                >
                  {col.label}
                </TableCell>
              );
            })}

          </TableRow>
        </TableHead>

        {/* ===== BODY ===== */}
        <TableBody>
          {loading
            ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {checkboxSelection && (
                    <TableCell padding="checkbox" align="center">
                      <Skeleton variant="rectangular" width={18} height={18} />
                    </TableCell>
                  )}

                  {visibleColumns.map((col, colIndex) => {
                    const alignment = getCellAlignment(col.key, colIndex);
                    return (
                      <TableCell key={`skeleton-cell-${colIndex}`} align={alignment}>
                        <Skeleton variant="text" height={25} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            : rows.map((row, index) => {
                const selected = isSelected(row.id);
                const disabled = isRowDisabledCheck(row);

                return (
                  <TableRow 
                    key={`${row.id}-${index}`} 
                    hover={!disabled} 
                    selected={selected && !disabled}
                    sx={{
                      opacity: disabled ? 0.6 : 1,
                      backgroundColor: disabled ? 'action.hover' : 'inherit',
                    }}
                  >
                    {checkboxSelection && (
                      <TableCell padding="checkbox" align="center">
                        <Checkbox
                          checked={selected}
                          onChange={() =>
                            !disabled && onRowSelect?.(row.id, row)
                          }
                          disabled={disabled}
                        />
                      </TableCell>
                    )}

                    {visibleColumns.map((col, colIndex) => {
                      const alignment = getCellAlignment(col.key, colIndex);
                      
                      if (col.key === "serialNo") {
                        return (
                          <TableCell key="serialNo" align={alignment}>
                            {(currentPage - 1) * rowsPerPage + index + 1}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={String(col.key)}
                          align={alignment}
                          sx={{
                            ...(alignment === "right" && {
                              "& > *": {
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                              },
                            }),
                          }}
                        >
                          {col.render
                            ? col.render(row)
                            : String(row[col.key as keyof T] ?? "")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ================= EXPORT ================= */

const CustomTable = memo(CustomTableComponent) as typeof CustomTableComponent;
export default CustomTable;
