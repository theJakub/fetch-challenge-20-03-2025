import React from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const AnimatedPaper = motion(Paper);

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const LoginPage = () => {
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && emailError && !validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    login({ name, email });
  };

  return (
    <Container maxWidth="sm">
      <AnimatedPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
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
            error={!!emailError}
            fullWidth
            helperText={emailError}
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleEmailChange}
            required
            type="email"
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
      </AnimatedPaper>
    </Container>
  );
};

export default LoginPage;
