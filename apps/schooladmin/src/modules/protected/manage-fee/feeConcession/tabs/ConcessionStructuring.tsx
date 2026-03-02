
"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Chip,
  IconButton,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Collapse,
  alpha,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Search as SearchIcon, Filter } from "lucide-react";
import AddIcon from "@mui/icons-material/Add";
import { CustomMultiSelect } from "@/modules/shared/components/forms";
import MultiSelect from "@/modules/shared/components/forms/MultiSelect";

interface FeeRow {
  id: string;
  feeType: string;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  january: number;
  february: number;
  march: number;
  students: number;
}

interface GroupRow {
  id: string;
  name: string;
  expanded: boolean;
  isEditing?: boolean;
  fees: FeeRow[];
}

const ConcessionStructuring = () => {
  const theme = useTheme();
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedGroups, setSelectedGroups] = useState<(string | number)[]>([]);
  const [isTableEditable, setIsTableEditable] = useState(false);

  // Sample data based on the screenshot
  const [groups, setGroups] = useState<GroupRow[]>([
    {
      id: "1",
      name: "Nursery - V",
      expanded: true,
      fees: [
        {
          id: "1-1",
          feeType: "Annual fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 100,
          december: 100,
          january: 100,
          february: 100,
          march: 100,
          students: 0,
        },
        {
          id: "1-2",
          feeType: "Monthly Fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 100,
          december: 100,
          january: 100,
          february: 101,
          march: 100,
          students: 0,
        },
        {
          id: "1-3",
          feeType: "Tuition Fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 100,
          december: 100,
          january: 102,
          february: 100,
          march: 100,
          students: 0,
        },
      ],
    },
    {
      id: "2",
      name: "VI - X",
      expanded: false,
      fees: [
        {
          id: "2-1",
          feeType: "Annual fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 100,
          december: 100,
          january: 100,
          february: 100,
          march: 100,
          students: 0,
        },
        {
          id: "2-2",
          feeType: "Admission fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 100,
          december: 103,
          january: 100,
          february: 100,
          march: 100,
          students: 0,
        },
      ],
    },
    {
      id: "3",
      name: "XI - XII",
      expanded: false,
      fees: [
        {
          id: "3-1",
          feeType: "Hostel Fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 104,
          december: 100,
          january: 100,
          february: 100,
          march: 100,
          students: 0,
        },
        {
          id: "3-2",
          feeType: "Transportation fee",
          april: 100,
          may: 100,
          june: 100,
          july: 100,
          august: 100,
          september: 100,
          october: 100,
          november: 105,
          december: 100,
          january: 100,
          february: 100,
          march: 100,
          students: 0,
        },
      ],
    },
  ]);

  const months = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSelectAllGroups = () => {
    if (selectedGroups.length === groups.length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(groups.map((g) => g.id));
    }
  };

  const handleToggleExpand = (groupId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, expanded: !group.expanded } : group
      )
    );
  };

  const handleEditGroup = (groupId: string) => {
    // This would navigate to manage groups or open edit modal
    console.log("Edit group:", groupId);
  };

  const handleEditTable = () => {
    setIsTableEditable(!isTableEditable);
  };

  const updateFeeValue = (
    groupId: string,
    feeId: string,
    month: keyof Omit<FeeRow, "id" | "feeType" | "students">,
    value: number
  ) => {
    if (!isTableEditable) return;
    
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fees: group.fees.map((fee) =>
                fee.id === feeId ? { ...fee, [month]: value } : fee
              ),
            }
          : group
      )
    );
  };

  const getCellColor = (value: number) => {
    if (value !== 100) {
      return theme.palette.warning.light;
    }
    return "inherit";
  };

  const renderFeeTable = (group: GroupRow) => (
    <TableContainer component={Paper} elevation={0} sx={{ mt: 1, mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, backgroundColor: theme.palette.grey[100] }}>
              Installments
            </TableCell>
            {months.map((month) => (
              <TableCell
                key={month}
                align="center"
                sx={{ fontWeight: 600, backgroundColor: theme.palette.grey[100] }}
              >
                {month}
              </TableCell>
            ))}
            <TableCell
              align="center"
              sx={{ fontWeight: 600, backgroundColor: theme.palette.grey[100] }}
            >
              Students
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {group.fees.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                {row.feeType}
              </TableCell>
              
              {/* Month values - editable when isTableEditable is true */}
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.april) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.april}
                    onChange={(e) => updateFeeValue(group.id, row.id, "april", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.april
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.may) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.may}
                    onChange={(e) => updateFeeValue(group.id, row.id, "may", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.may
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.june) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.june}
                    onChange={(e) => updateFeeValue(group.id, row.id, "june", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.june
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.july) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.july}
                    onChange={(e) => updateFeeValue(group.id, row.id, "july", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.july
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.august) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.august}
                    onChange={(e) => updateFeeValue(group.id, row.id, "august", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.august
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.september) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.september}
                    onChange={(e) => updateFeeValue(group.id, row.id, "september", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.september
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.october) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.october}
                    onChange={(e) => updateFeeValue(group.id, row.id, "october", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.october
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.november) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.november}
                    onChange={(e) => updateFeeValue(group.id, row.id, "november", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.november
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.december) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.december}
                    onChange={(e) => updateFeeValue(group.id, row.id, "december", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.december
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.january) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.january}
                    onChange={(e) => updateFeeValue(group.id, row.id, "january", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.january
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.february) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.february}
                    onChange={(e) => updateFeeValue(group.id, row.id, "february", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.february
                )}
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: getCellColor(row.march) }}>
                {isTableEditable ? (
                  <TextField
                    type="number"
                    value={row.march}
                    onChange={(e) => updateFeeValue(group.id, row.id, "march", Number(e.target.value))}
                    size="small"
                    sx={{ width: 70 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                ) : (
                  row.march
                )}
              </TableCell>

              {/* Students column */}
              <TableCell align="center">
                <Chip
                  label={row.students}
                  size="small"
                  color={row.students > 0 ? "primary" : "default"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={600}>
          Concession Structuring
        </Typography>

        <Stack direction="row" spacing={2}>
          {selectedGroups.length > 0 && (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete ({selectedGroups.length})
            </Button>
          )}
          <Button
            variant="contained"
            color="warning"
            startIcon={<AddIcon />}
          >
            Create New Fee
          </Button>
        </Stack>
      </Box>
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
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <MultiSelect
                label="Select Groups"
                options={groups.map((g) => ({
                  value: g.id,
                  label: g.name,
                }))}
                value={selectedGroups}
                onChange={setSelectedGroups}
              />
            </FormControl>

            <Button startIcon={<Filter size={18} />}>
              Filter
            </Button>
          </Stack>

          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              placeholder="Search fee type..."
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
            <Button
              variant={isTableEditable ? "contained" : "outlined"}
              color="warning"
              startIcon={isTableEditable ? <SaveIcon/> : <EditIcon />}
              onClick={handleEditTable}
            >
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 1.2,
          mt: 2,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 40px",
              alignItems: "center",
              px: 2,
              py: 1,
              backgroundColor: theme.palette.grey[100],
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              fontWeight: 600,
            }}
          >
            <Checkbox
              checked={selectedGroups.length === groups.length && groups.length > 0}
              indeterminate={selectedGroups.length > 0 && selectedGroups.length < groups.length}
              onChange={handleSelectAllGroups}
              size="small"
            />
            <Typography variant="subtitle2">Group Name</Typography>
            <Typography variant="subtitle2" align="center">Action</Typography>
          </Box>

          {/* Group Rows */}
          {groups.map((group) => (
            <Box key={group.id}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 40px",
                  alignItems: "center",
                  px: 2,
                  py: 1.5,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  backgroundColor: selectedGroups.includes(group.id) 
                    ? alpha(theme.palette.primary.main, 0.05)
                    : "transparent",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={selectedGroups.includes(group.id)}
                    onChange={() => handleGroupSelect(group.id)}
                    size="small"
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleToggleExpand(group.id)}
                    sx={{ ml: 0.5 }}
                  >
                    {group.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body1">{group.name}</Typography>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditGroup(group.id)}
                    sx={{ ml: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    size="small"
                    color="warning"
                    onClick={handleEditTable}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {/* Fee Table for the group */}
              <Collapse in={group.expanded}>
                <Box sx={{ pl: 4, pr: 2 }}>
                  {renderFeeTable(group)}
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
          <TablePagination
            component="div"
            count={groups.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{
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
            count={Math.ceil(groups.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, newPage) => setPage(newPage - 1)}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ConcessionStructuring;