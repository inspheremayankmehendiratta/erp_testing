"use client";

import { useState, useMemo, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Popover,
  Chip,
  IconButton,
  Switch,
  useTheme,
  TablePagination,
  Pagination,
} from "@mui/material";
import { Eye, Filter, Pencil, Trash2 } from "lucide-react";
import { Search as SearchIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomFilters from "@/modules/shared/components/customfilters/CustomFilters";
import ExportActions from "@/modules/shared/components/customfilters/ExportActions";
import { CustomMultiSelect } from "@/modules/shared/components/forms";

import { ColumnDef } from "@/modules/shared/components/customtable/type";
import { CustomModal } from "@/modules/shared/components/custommodal";
import { CustomEditableTable } from "@/modules/shared/components/customeditabletable";

interface InstallmentRow {
  id: number;
  installmentName: string;
  priority: number;
  dueDate: string;
  status: boolean;
  classes: string[];
  isNew?: boolean;
  isEditing?: boolean;
}

const ConcessionGroup = ({ title = "Concession Group" }) => {
  const theme = useTheme();
  const visbleColumnsCount = 6;

  const [rows, setRows] = useState<InstallmentRow[]>([
    {
      id: 1,
      installmentName: "April",
      priority: 1,
      dueDate: "2023-04-03",
      status: true,
      classes: ["V", "VI"],
    },
  ]);

  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editBackup, setEditBackup] = useState<InstallmentRow | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewerRow, setViewerRow] = useState<InstallmentRow | null>(null);

  const columnApiRef = useRef<any>(null);

  const isEditing = editingRowId !== null;

  const disabledRowIds = useMemo(() => {
    return rows.filter((row) => row.isEditing).map((row) => row.id);
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    return rows.filter((row) =>
      row.installmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rows, searchTerm]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedRows = useMemo(
    () => filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, page, rowsPerPage]
  );

  // ================= CREATE =================
  const handleCreate = () => {
    if (isEditing) return;

    const newRow: InstallmentRow = {
      id: Date.now(),
      installmentName: "",
      priority: rows.length + 1,
      dueDate: "",
      status: true,
      classes: [],
      isNew: true,
      isEditing: true,
    };

    setRows((prev) => [newRow, ...prev]);
    setEditingRowId(newRow.id);
    setSelectedIds([]);
  };

  // ================= EDIT =================
  const handleEdit = (id: number) => {
    if (isEditing) return;

    const row = rows.find((r) => r.id === id);
    if (!row) return;

    setEditBackup({ ...row });
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isEditing: true } : r))
    );
    setEditingRowId(id);
    setSelectedIds([]);
  };

  // ================= SAVE =================
  const handleSave = (id: number) => {
    const row = rows.find((r) => r.id === id);
    if (!row?.installmentName.trim()) {
      alert("Installment Name required");
      return;
    }

    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isEditing: false, isNew: false } : r
      )
    );
    setEditingRowId(null);
    setEditBackup(null);
  };

  // ================= CANCEL =================
  const handleCancel = (id: number) => {
    setRows((prev) => {
      const row = prev.find((r) => r.id === id);
      if (!row) return prev;

      if (row.isNew) return prev.filter((r) => r.id !== id);

      if (editBackup)
        return prev.map((r) =>
          r.id === id ? { ...editBackup, isEditing: false } : r
        );

      return prev;
    });

    setEditingRowId(null);
    setEditBackup(null);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true)
  };

  const updateField = (id: number, key: keyof InstallmentRow, value: any) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
  };

  // ================= COLUMNS =================
  const ALL_COLUMNS: ColumnDef<InstallmentRow>[] = [
    {
      key: "installmentName",
      label: "Installment Name",
      render: (row) =>
        row.isEditing ? (
          <TextField
            size="small"
            fullWidth
            value={row.installmentName}
            onChange={(e) =>
              updateField(row.id, "installmentName", e.target.value)
            }
          />
        ) : (
          row.installmentName
        ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) =>
        row.isEditing ? (
          <TextField
            type="number"
            size="small"
            value={row.priority}
            onChange={(e) =>
              updateField(row.id, "priority", Number(e.target.value))
            }
          />
        ) : (
          row.priority
        ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (row) =>
        row.isEditing ? (
          <TextField
            type="date"
            size="small"
            value={row.dueDate}
            onChange={(e) =>
              updateField(row.id, "dueDate", e.target.value)
            }
          />
        ) : (
          row.dueDate
        ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Switch
          checked={row.status}
          disabled={!row.isEditing}
          onChange={(e) =>
            updateField(row.id, "status", e.target.checked)
          }
          color="warning"
        />
      ),
    },
    {
      key: "classes",
      label: "Classes",
      render: (row) =>
        row.isEditing ? (
          <CustomMultiSelect
            id={`classes-${row.id}`}
            name={`classes-${row.id}`}
            value={row.classes}
            options={[
              { label: "V", value: "V" },
              { label: "VI", value: "VI" },
              { label: "VII", value: "VII" },
            ]}
            onChange={(e) =>
              updateField(row.id, "classes", e.target.value)
            }
          />
        ) : (
          <Stack direction="row" spacing={1}>
            {row.classes.slice(0, 2).map((cls) => (
              <Chip key={cls} label={cls} size="small" />
            ))}
            {row.classes.length > 2 && (
              <Chip
                label={`+${row.classes.length - 2}`}
                size="small"
              />
            )}
          </Stack>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) =>
        row.isEditing ? (
          <Stack direction="row" spacing={1}>
            <IconButton
              color="success"
              onClick={() => handleSave(row.id)}
              sx={{ cursor: 'pointer' }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleCancel(row.id)}
              sx={{ cursor: 'pointer' }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => setViewerRow(row)}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => handleEdit(row.id)}
            >
              <EditIcon />
            </IconButton>
          </Stack>
        ),
    },
  ];

  const defaultColumnOptions = ALL_COLUMNS.map((c) => ({
    value: c.key as string,
    label: c.label,
  }));

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    ALL_COLUMNS.slice(0, visbleColumnsCount).map((c) => String(c.key))
  );

  return (
    <>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>

        <Box display="flex" gap={2}>
          {selectedIds.length > 0 && (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              disabled={isEditing}
              onClick={() => setIsDeleting(true)}
            >
              Delete ({selectedIds.length})
            </Button>
          )}
          <Button
            variant="contained"
            color="warning"
            startIcon={<AddIcon />}
            disabled={isEditing}
            onClick={handleCreate}
          >
            Create
          </Button>
        </Box>
      </Box>

      {/* WRAPPER SAME AS YOUR CODE */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 1.2,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        {/* FILTERS ROW (UNCHANGED STRUCTURE) */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack direction="row" px={2}>
            <CustomMultiSelect
              id="visible-columns"
              name="visible-columns"
              value={visibleColumns}
              options={columnApiRef.current?.columnOptions ?? defaultColumnOptions}
              placeholder="Columns"
              onChange={(e) => {
                const newKeys = e.target.value as string[];
                setVisibleColumns(newKeys);
                columnApiRef.current?.setVisibleColumnKeys(newKeys);
              }}
            />
          </Stack>

          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              placeholder="Search"
              size="small"
              sx={{ width: 300 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <ExportActions onExport={() => {}} loading={false} />
            <IconButton onClick={(e) => setShowFilters(e.currentTarget)}>
              <Filter size={20} />
            </IconButton>
            <Popover
              open={Boolean(showFilters)}
              anchorEl={showFilters}
              onClose={() => setShowFilters(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <CustomFilters onApply={() => setShowFilters(null)} />
            </Popover>
          </Box>
        </Box>

        {/* TABLE */}
        <Paper elevation={0}>
          <CustomEditableTable
            rows={paginatedRows}
            columns={ALL_COLUMNS}
            checkboxSelection
            selectedIds={selectedIds}
            disabledRowIds={disabledRowIds}
            onRowSelect={(id) => {
              const numericId = id as number;
              setSelectedIds((prev) =>
                prev.includes(numericId)
                  ? prev.filter((x) => x !== numericId)
                  : [...prev, numericId]
              );
            }}
            onSelectAll={(ids, checked) =>
              setSelectedIds(checked ? (ids as number[]) : [])
            }
            columnVisibilityApi={(api) => {
              columnApiRef.current = api;
              setVisibleColumns(api.visibleColumnKeys as string[]);
            }}
            align="left"
            lastColumnAlign="right"
          />
          <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <TablePagination
                component="div"
                count={filteredRows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: (theme) => theme.palette.background.paper,
                  py: 1,
                  "& .MuiTablePagination-toolbar": {
                    justifyContent: "center",
                    gap: { xs: 1 },
                  },
                  "& .MuiTablePagination-spacer": {
                    display: "none",
                  },
                                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    {
                      margin: 0,
                      fontWeight: 500,
                      color: "text.secondary",
                      fontSize: "0.85rem",
                    },
                  "& .MuiTablePagination-actions": {
                    "& button": {
                      display: "none",
                    },
                  },
                }}
              />
              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page + 1}
                onChange={(_, newPage) => setPage(newPage - 1)}
                shape="rounded"
              />
            </Box>
        </Paper>
      </Box>

      {/* VIEWER MODAL */}
      {viewerRow && (
        <CustomModal
          open
          onClose={() => setViewerRow(null)}
          title="Installment Details"
          width={500}
        >
          <Typography>Name: {viewerRow.installmentName}</Typography>
          <Typography>Priority: {viewerRow.priority}</Typography>
          <Typography>Due Date: {viewerRow.dueDate}</Typography>
          <Typography>
            Status: {viewerRow.status ? "Active" : "Inactive"}
          </Typography>
          <Typography>
            Classes: {viewerRow.classes.join(", ")}
          </Typography>
        </CustomModal>
      )}
      {isDeleting &&  <CustomModal
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        title="Confirm Deletion"
        width={600}
        footer={
          <>
            <Button onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => {
              setRows((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
              setSelectedIds([]);
              setIsDeleting(false)}}>
              Delete
            </Button>
          </>
        }
      >
        <Typography>
          Are you sure you want to delete?
        </Typography>
      </CustomModal>}
    </>
  );
};

export default ConcessionGroup;