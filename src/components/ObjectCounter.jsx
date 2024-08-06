import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ObjectCounter = () => {
  const { authApiClient } = useAuth();

  const { data: counts, isLoading, error } = useQuery({
    queryKey: ['objectCounts'],
    queryFn: () => authApiClient().get('/api/counts').then(res => res.data),
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading object counts</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Current Object Counts</Typography>
        {Object.entries(counts).map(([objectType, count]) => (
          <Typography key={objectType}>
            {objectType}: {count}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default ObjectCounter;
