import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const DailyStatisticsChart = () => {
  const { authApiClient } = useAuth();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dailyStats'],
    queryFn: () => authApiClient().get('/api/stats').then(res => res.data),
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading daily statistics</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Daily Statistics</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(stats[0]).filter(key => key !== 'date').map((objectType, index) => (
              <Line 
                key={objectType} 
                type="monotone" 
                dataKey={objectType} 
                stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} 
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DailyStatisticsChart;
