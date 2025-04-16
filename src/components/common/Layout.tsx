import React from 'react';
import { Container, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Typography
        align="center"
        sx={{ borderBottom: '1px solid black', paddingBottom: '8px' }}
        variant="h3"
      >
        Find Your Perfect Pup!
      </Typography>
      <Container
        maxWidth="lg"
        sx={{ py: 4, backgroundColor: 'white', height: '100vh' }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
