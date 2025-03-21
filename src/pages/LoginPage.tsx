import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    login({ name, email });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            autoComplete="name"
            autoFocus
            fullWidth
            id="name"
            label="Name"
            margin="normal"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
          />
          <TextField
            autoComplete="email"
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
