import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ServiceDetailPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Service Detail Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Individual service details will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default ServiceDetailPage;