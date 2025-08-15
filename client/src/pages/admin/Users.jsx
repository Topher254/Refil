import React from 'react';

// TODO: Integrate with backend users API and context when available

const AdminUsers = () => (
  <div style={{ padding: 24 }}>
    <h2>User Management</h2>
    <ul>
      {/* The following list items are placeholders for future integration */}
      <li>
        <b>Placeholder User 1</b> (Customer) - Status: Active
        <button style={{ marginLeft: 8 }}>Deactivate</button>
        <button style={{ marginLeft: 4 }}>Blacklist</button>
      </li>
      <li>
        <b>Placeholder User 2</b> (Vendor) - Status: Pending
        <button style={{ marginLeft: 8 }}>Deactivate</button>
        <button style={{ marginLeft: 4 }}>Approve</button>
        <button style={{ marginLeft: 4 }}>Blacklist</button>
      </li>
      <li>
        <b>Placeholder User 3</b> (Vendor) - Status: Active
        <button style={{ marginLeft: 8 }}>Deactivate</button>
        <button style={{ marginLeft: 4 }}>Blacklist</button>
      </li>
    </ul>
  </div>
);

export default AdminUsers;