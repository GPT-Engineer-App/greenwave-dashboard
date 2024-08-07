import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Card, CardContent, Snackbar } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../services/api';

const Settings = () => {
  const [formData, setFormData] = useState({
    alertThreshold: '',
    maxDetectionsPerDay: '',
    notificationEmail: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries('settings');
      setSnackbarOpen(true);
    },
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettingsMutation.mutate(formData);
  };

  if (isLoading) return <Typography>Loading settings...</Typography>;
  if (error) return <Typography color="error">Error loading settings: {error.message}</Typography>;

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Alert Threshold"
                  name="alertThreshold"
                  type="number"
                  value={formData.alertThreshold}
                  onChange={handleInputChange}
                  helperText="Set the threshold for triggering alerts"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Max Detections Per Day"
                  name="maxDetectionsPerDay"
                  type="number"
                  value={formData.maxDetectionsPerDay}
                  onChange={handleInputChange}
                  helperText="Set the maximum number of detections per day"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notification Email"
                  name="notificationEmail"
                  type="email"
                  value={formData.notificationEmail}
                  onChange={handleInputChange}
                  helperText="Email address for receiving notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Settings
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Settings updated successfully"
      />
    </div>
  );
};

export default Settings;
