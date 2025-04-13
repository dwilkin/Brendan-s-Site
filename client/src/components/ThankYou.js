import React from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';

const ThankYou = () => {
  const handleCalendlyClick = () => {
    window.open('https://calendly.com/your-calendly-link', '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="body1" paragraph>
          We've received your information and will get back to you shortly.
        </Typography>
        <Typography variant="body1" paragraph>
          Would you like to schedule a time to discuss your project?
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCalendlyClick}
            sx={{ minWidth: 200 }}
          >
            Schedule a Call
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ThankYou; 