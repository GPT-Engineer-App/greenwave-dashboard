import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Recycling Object Detection System Dashboard. More features coming soon!
      </Typography>
    </Container>
  );
};

export default Dashboard;
