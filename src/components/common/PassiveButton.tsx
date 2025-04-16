import React from 'react';
import { Button } from '@mui/material';

const PassiveButton = ({
  children,
  disabled,
  onClick,
  highlight = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  highlight?: boolean;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size="small"
      variant="text"
      sx={{
        color: highlight ? '' : 'rgba(0, 0, 0, 0.6)',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
      }}
    >
      {children}
    </Button>
  );
};

export default PassiveButton;
