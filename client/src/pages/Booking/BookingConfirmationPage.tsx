import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const BookingConfirmationPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Booking Confirmation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Booking confirmation details will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default BookingConfirmationPage;