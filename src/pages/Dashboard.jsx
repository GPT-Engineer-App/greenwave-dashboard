import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ObjectCounter from '../components/ObjectCounter';
import DailyStatisticsChart from '../components/DailyStatisticsChart';
import RecentAlerts from '../components/RecentAlerts';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RecycleDetect Dashboard</Text>
      <View style={styles.content}>
        <ObjectCounter />
        <DailyStatisticsChart />
        <RecentAlerts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
});

export default Dashboard;
