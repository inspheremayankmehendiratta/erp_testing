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
  Skeleton,
  TextField,
  Stack,
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

interface CustomTableProps<T extends { id: number | string }> {
  rows: T[];
  columns: ColumnDef<T>[];
  checkboxSelection?: boolean;
  emptyMessage?: string;
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

  /** Optional Search */
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

/* ================= COMPONENT ================= */

function CustomTableComponent<T extends { id: number | string }>({
  rows,
  columns,
  checkboxSelection = false,
  emptyMessage,
  selectedIds = [],
  onRowSelect,
  onSelectAll,
  columnVisibilityApi,
  defaultVisibleCount,
  currentPage = 1,
  rowsPerPage = rows.length,
  loading = false
}: CustomTableProps<T>) {
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
  }, [visibleColumnKeys, columnOptions]);




  const isSelected = (id: number | string) => selectedIds.includes(id);
  const allIds = rows.map(r => r.id);

  const allSelected =
    rows.length > 0 && selectedIds.length === rows.length;

  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < rows.length;

  /* ================= RENDER ================= */
  return (
    <>
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={indeterminate}
                    onChange={(e) =>
                      onSelectAll?.(allIds, e.target.checked)
                    }
                  />
                </TableCell>
              )}

              {visibleColumns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    width: col.width,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* ===== BODY ===== */}
          <TableBody>
            {loading
              ? Array.from({ length: 10 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {checkboxSelection && (
                    <TableCell padding="checkbox">
                      <Skeleton variant="rectangular" width={18} height={18} />
                    </TableCell>
                  )}

                  {visibleColumns.map((col, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`}>
                      <Skeleton variant="text" height={25} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
              : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={
                      visibleColumns.length + (checkboxSelection ? 1 : 0)
                    }
                    align="center"
                    sx={{ py: 4 }}
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : rows.map((row, index) => {
                const selected = isSelected(row.id);

                return (
                  <TableRow key={`${row.id}-${index}`} hover selected={selected}>
                    {checkboxSelection && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected}
                          onChange={() =>
                            onRowSelect?.(row.id, row)
                          }
                        />
                      </TableCell>
                    )}

                    {visibleColumns.map((col) => {
                      if (col.key === "serialNo") {
                        return (
                          <TableCell key="serialNo">
                            {(currentPage - 1) * rowsPerPage + index + 1}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={String(col.key)}>
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

    </>
  );
}

/* ================= EXPORT ================= */

const CustomTable = memo(CustomTableComponent) as typeof CustomTableComponent;
export default CustomTable;
