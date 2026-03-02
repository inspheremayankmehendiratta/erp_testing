import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";

export interface MultiSelectOption {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  minWidth?: number;
  size?: "small" | "medium";
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  minWidth = 250,
  size = "small",
}) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: selected },
    } = event;

    onChange(typeof selected === "string" ? selected.split(",") : selected);
  };

  const handleDelete = (valToDelete: string | number) => {
    onChange(value.filter((val) => val !== valToDelete));
  };

  return (
    <FormControl size={size} sx={{ minWidth }}>
      <InputLabel>{label}</InputLabel>

      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((val) => {
              const option = options.find((opt) => opt.value === val);

              return (
                <Chip
                  key={val}
                  label={option?.label ?? val}
                  size="small"
                  onDelete={(e) => {
                    e.stopPropagation(); // prevent dropdown from opening
                    handleDelete(val);
                  }}
                  onMouseDown={(e) => e.stopPropagation()} // extra safety
                />
              );
            })}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;