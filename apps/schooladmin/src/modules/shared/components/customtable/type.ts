
import React, { ReactNode, memo } from "react";

export interface CustomTableProps {
  columns: string[];
  children: React.ReactNode;
  checkBoxSelection?: boolean;
  data?: any[]; // Complete row data array
  rowKey?: string; // Key field name to match rows
  // Controlled by parent page
  selectedRows?: any[]; // Array of selected row data instead of Set
  onSelectRow?: (rowKey: any, rowData?: any) => void;
  onSelectAll?: (rowKeys: any[], allData?: any[], checked?: boolean) => void;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
}
// ================= TYPES =================
export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  width?: number | string;

  // ⭐ for action buttons / custom UI
  render?: (row: T) => ReactNode;
  
}
