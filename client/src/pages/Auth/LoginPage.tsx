import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Login form will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;