import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { formatDate } from '../utils/formatters';
import { getRecentAlerts } from '../services/api';

const RecentAlerts = () => {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['recentAlerts'],
    queryFn: getRecentAlerts,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading recent alerts</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Recent Alerts</Typography>
        <List>
          {alerts.map((alert, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={alert.message}
                secondary={formatDate(alert.timestamp)}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
