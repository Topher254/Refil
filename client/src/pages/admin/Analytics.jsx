import React from 'react';

const mockAnalytics = {
  revenue: { daily: 10000, weekly: 70000, monthly: 300000 },
  activeVendors: 12,
  activeCustomers: 120,
  mostOrdered: 'ProGas 6kg',
  retention: '85%'
};

const AdminAnalytics = () => (
  <div style={{ padding: 24 }}>
    <h2>Analytics & Reporting</h2>
    <div><b>Daily Revenue:</b> KES {mockAnalytics.revenue.daily}</div>
    <div><b>Weekly Revenue:</b> KES {mockAnalytics.revenue.weekly}</div>
    <div><b>Monthly Revenue:</b> KES {mockAnalytics.revenue.monthly}</div>
    <div><b>Active Vendors:</b> {mockAnalytics.activeVendors}</div>
    <div><b>Active Customers:</b> {mockAnalytics.activeCustomers}</div>
    <div><b>Most Ordered Product:</b> {mockAnalytics.mostOrdered}</div>
    <div><b>Customer Retention Rate:</b> {mockAnalytics.retention}</div>
  </div>
);

export default AdminAnalytics;