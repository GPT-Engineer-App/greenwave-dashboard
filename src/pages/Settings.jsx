import React from 'react';
import { Typography } from '@mui/material';

const Settings = () => {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1">
        Manage your account settings and preferences here.
      </Typography>
      {/* Add settings components here */}
    </div>
  );
};

export default Settings;
