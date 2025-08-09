import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const BookingPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Booking Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Service booking interface will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default BookingPage;