import React from 'react';
import { Button } from '@mui/material';

const PassiveButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size="small"
      variant="text"
      sx={{
        color: 'rgba(0, 0, 0, 0.6)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {children}
    </Button>
  );
};

export default PassiveButton;
