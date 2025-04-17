import React from 'react';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, height: '100vh' }}>
      {children}
    </Container>
  );
};

export default Layout;
