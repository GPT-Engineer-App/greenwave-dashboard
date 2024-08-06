import React from 'react';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Recycling Object Detection System Dashboard. Here you can view your recycling statistics and recent detections.
      </Typography>
      {/* Add more dashboard components here */}
    </div>
  );
};

export default Dashboard;
