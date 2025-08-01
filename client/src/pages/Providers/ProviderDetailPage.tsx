import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProviderDetailPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Provider Detail Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Individual provider details will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default ProviderDetailPage;