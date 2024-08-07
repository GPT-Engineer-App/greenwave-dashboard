import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, CircularProgress, Grid, Alert } from '@mui/material';
import { getObjectCounts } from '../services/api';

const ObjectCounter = () => {
  const { data: counts, isLoading, error, isError } = useQuery({
    queryKey: ['objectCounts'],
    queryFn: getObjectCounts,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">Error loading object counts: {error.message}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Real-Time Object Counts</Typography>
        <Grid container spacing={2}>
          {Object.entries(counts).map(([objectType, count]) => (
            <Grid item xs={6} sm={4} md={3} key={objectType}>
              <Typography variant="subtitle1">{objectType}</Typography>
              <Typography variant="h4">{count}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ObjectCounter;
