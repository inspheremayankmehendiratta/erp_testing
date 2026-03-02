'use client';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type StatsLineChartProps = {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
};

export const StatsLineChart = ({
  data,
  labels,
  height = 260,
  color = '#dfdff1',
}: StatsLineChartProps) => {
  const series = [
    {
      name: 'Stats',
      data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [color],
    stroke: {
      curve: 'straight',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: labels,
      tooltip: { enabled: false },
    },
    yaxis: {
      min: 10,
      max: 100,
      tickAmount: 10,
    },
    grid: {
      strokeDashArray: 4,
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: false },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <Box sx={{ mt: 2 }}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={height}
      />
    </Box>
  );
};


