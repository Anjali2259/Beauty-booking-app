import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Profile Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User profile management will be implemented here
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;