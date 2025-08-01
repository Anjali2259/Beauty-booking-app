import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Register Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Registration form will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;