'use client';

import { Box } from '@mui/material';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';

type StatsSparkBarProps = {
  data: number[];
  color?: string;
  height?: number;
  barSize?: number;
  backgroundColor?: string;
};

export const StatsSparkBar = ({
  data,
  color,
  height,
  barSize,
  backgroundColor,
}: StatsSparkBarProps) => {
  const chartData = data.map((value, index) => ({
    name: index,
    value,
  }));

  return (
    <Box
      sx={{
        backgroundColor,
        borderRadius: 2,
        px: 1,
        py: 0.5,
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={chartData}>
          <Bar
            dataKey="value"
            fill={color}
            barSize={barSize}
            radius={[6, 6, 6, 6]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}; 
