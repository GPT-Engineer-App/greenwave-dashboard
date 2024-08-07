import React from 'react';
import { Typography, Grid } from '@mui/material';
import ObjectCounter from '../components/ObjectCounter';
import DailyStatisticsChart from '../components/DailyStatisticsChart';
import RecentAlerts from '../components/RecentAlerts';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        RecycleDetect Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ObjectCounter />
        </Grid>
        <Grid item xs={12} md={8}>
          <DailyStatisticsChart />
        </Grid>
        <Grid item xs={12}>
          <RecentAlerts />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
