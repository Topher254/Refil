import React from 'react';

const mockUsers = [
  { id: 1, name: 'Alice', type: 'Customer', status: 'Active' },
  { id: 2, name: 'Bob', type: 'Vendor', status: 'Pending' },
  { id: 3, name: 'Carol', type: 'Vendor', status: 'Active' },
];

const AdminUsers = () => (
  <div style={{ padding: 24 }}>
    <h2>User Management</h2>
    <ul>
      {mockUsers.map(user => (
        <li key={user.id}>
          <b>{user.name}</b> ({user.type}) - Status: {user.status}
          <button style={{ marginLeft: 8 }}>Deactivate</button>
          {user.type === 'Vendor' && user.status === 'Pending' && (
            <button style={{ marginLeft: 4 }}>Approve</button>
          )}
          <button style={{ marginLeft: 4 }}>Blacklist</button>
        </li>
      ))}
    </ul>
  </div>
);

export default AdminUsers;