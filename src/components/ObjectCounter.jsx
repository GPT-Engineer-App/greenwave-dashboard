import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, CircularProgress, Grid } from '@mui/material';
import { getObjectCounts } from '../services/api';

const ObjectCounter = () => {
  const { data: counts, isLoading, error } = useQuery({
    queryKey: ['objectCounts'],
    queryFn: getObjectCounts,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading object counts</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Real-Time Object Counts</Typography>
        <Grid container spacing={2}>
          {Object.entries(counts).map(([objectType, count]) => (
            <Grid item xs={6} key={objectType}>
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
