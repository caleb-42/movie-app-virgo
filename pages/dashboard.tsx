import React from 'react';
import PrivateRoute from '../utils/privateRoute';
import DashboardTemplate from '../components/templates/dashboard';

export default function Dashboard() {
  return <PrivateRoute Component={DashboardTemplate} />;
}
