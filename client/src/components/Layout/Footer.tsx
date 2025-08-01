import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Spa } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Spa sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BeautyBook
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Your one-stop platform for booking beauty services. Connect with
              top-rated salons and beauty professionals in your area.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2" color="text.secondary">
                © 2024 BeautyBook. All rights reserved.
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Link href="#" color="inherit" sx={{ mr: 2 }}>
                  Privacy Policy
                </Link>
                <Link href="#" color="inherit" sx={{ mr: 2 }}>
                  Terms of Service
                </Link>
                <Link href="#" color="inherit">
                  Contact Us
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;