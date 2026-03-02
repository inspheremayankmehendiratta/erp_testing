'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CustomAccordionProps {
  title: string;
  expanded: boolean;
  onChange: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const CustomAccordian: React.FC<CustomAccordionProps> = ({
  title,
  expanded,
  onChange,
  disabled = false,
  children,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
      elevation={1}
      variant="outlined"
      sx={{
        mb: 2,
        borderRadius: 2,
        '&:before': { display: 'none' },
        transition: 'all 0.3s ease',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: 64,
          px: 3,
          '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'center',
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: 'text.secondary',
            transition: 'transform 0.2s ease',
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(180deg)',
          },
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};


