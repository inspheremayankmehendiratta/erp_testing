import { Box, Typography, Chip } from '@mui/material';

type HeaderStatProps = {
  value?: string;
  change: number;
};

export const HeaderStat = ({ value, change }: HeaderStatProps) => {
  const isPositive = change >= 0;

  return (
    <Box sx={{ textAlign: 'right' }}>
      <Typography fontWeight={700}>{value}</Typography>
      <Chip
        size="small"
        label={`${isPositive ? '+' : ''}${change}%`}
        color={isPositive ? 'success' : 'error'}
      />
    </Box>
  );
};


