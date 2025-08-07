import React from 'react';

const mockPayments = [
  { id: 1, type: 'M-Pesa', amount: 1399, status: 'Received', time: '10:30 AM' },
  { id: 2, type: 'Cash on Delivery', amount: 2500, status: 'Pending', time: '2:00 PM' },
];

const VendorPayments = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Payment Tracking</h2>
      <h3>M-Pesa Payments</h3>
      <ul>
        {mockPayments.filter(p => p.type === 'M-Pesa').map(payment => (
          <li key={payment.id}>
            Amount: KES {payment.amount} - {payment.status} ({payment.time})
          </li>
        ))}
      </ul>
      <h3>Cash on Delivery</h3>
      <ul>
        {mockPayments.filter(p => p.type === 'Cash on Delivery').map(payment => (
          <li key={payment.id}>
            Amount: KES {payment.amount} - {payment.status} ({payment.time})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorPayments;