import React, { useState } from 'react';

const mockOrders = [
  { id: 1, vendor: 'Pro Gas Station', location: 'Westlands', status: 'Ongoing' },
  { id: 2, vendor: 'SeaGas', location: 'Kilimani', status: 'Completed' },
  { id: 3, vendor: 'Total', location: 'CBD', status: 'Ongoing' },
];

const AdminOrders = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? mockOrders : mockOrders.filter(o => o.status === filter);
  return (
    <div style={{ padding: 24 }}>
      <h2>Order Monitoring</h2>
      <label>Filter by status: </label>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
      <ul>
        {filtered.map(order => (
          <li key={order.id}>
            <b>{order.vendor}</b> - {order.location} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;