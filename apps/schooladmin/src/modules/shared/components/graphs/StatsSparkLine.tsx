'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type StatsSparkLineProps = {
  data?: number[];
  height?: number;
  width?: number;
  color?: string;
};

const fallbackData = [20, 40, 30, 50, 45, 60, 35];

export const StatsSparkLine = ({
  data = fallbackData,
  height = 40,
  width = 120,
  color = '#4C82FF',
}: StatsSparkLineProps) => {
  const series = [
    {
      data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true, // 🔥 removes axes, grid, padding
      },
    },
    colors: [color],
    stroke: {
      curve: 'straight',
      width: 2,
    },
    markers: {
      size: 0, // no dots (showMark: false)
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={height}
      width={width}
    />
  );
};


