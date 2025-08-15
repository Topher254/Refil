import React, { useState } from 'react';
import { UseAppContext } from '../../context/context';

const AdminOrders = () => {
  const { orders } = UseAppContext();
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);
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