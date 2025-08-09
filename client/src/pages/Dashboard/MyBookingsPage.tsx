import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MyBookingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Customer booking management will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default MyBookingsPage;