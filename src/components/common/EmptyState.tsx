import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  label: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ label }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '200px',
        width: '100%',
        padding: '32px',
      }}
    >
      <Typography variant="h6" color="text.secondary" align="center">
        {label}
      </Typography>
    </Box>
  );
};

export default EmptyState;
