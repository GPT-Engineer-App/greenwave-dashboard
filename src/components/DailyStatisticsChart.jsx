import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDailyStats } from '../services/api';

const DailyStatisticsChart = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dailyStats'],
    queryFn: getDailyStats,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading daily statistics</Typography>;

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

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
                stroke={colors[index % colors.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DailyStatisticsChart;
