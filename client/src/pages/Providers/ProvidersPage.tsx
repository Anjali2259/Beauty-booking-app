import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProvidersPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Providers Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Provider listings and search will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default ProvidersPage;