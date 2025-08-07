import React from 'react';

const mockOrders = [
  { id: 1, customer: 'Alice', product: 'ProGas 6kg', status: 'Incoming' },
  { id: 2, customer: 'Bob', product: 'ProGas 13kg', status: 'Accepted' },
  { id: 3, customer: 'Carol', product: 'ProGas 50kg', status: 'Out for Delivery' },
];

const VendorOrders = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Order Management</h2>
      <ul>
        {mockOrders.map(order => (
          <li key={order.id}>
            <b>{order.product}</b> for {order.customer} - Status: {order.status}
            {order.status === 'Incoming' && (
              <>
                <button style={{ marginLeft: 8 }}>Accept</button>
                <button style={{ marginLeft: 4 }}>Reject</button>
              </>
            )}
            {order.status === 'Accepted' && (
              <button style={{ marginLeft: 8 }}>Mark as Processing</button>
            )}
            {order.status === 'Out for Delivery' && (
              <button style={{ marginLeft: 8 }}>Mark as Delivered</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorOrders;