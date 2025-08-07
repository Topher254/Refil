import React from 'react';

const mockPayments = [
  { id: 1, vendor: 'Pro Gas Station', type: 'M-Pesa', amount: 1399, status: 'Received' },
  { id: 2, vendor: 'SeaGas', type: 'Cash on Delivery', amount: 2500, status: 'Pending' },
];

const AdminPayments = () => (
  <div style={{ padding: 24 }}>
    <h2>Payments Reconciliation</h2>
    <h3>M-Pesa Payments</h3>
    <ul>
      {mockPayments.filter(p => p.type === 'M-Pesa').map(payment => (
        <li key={payment.id}>
          {payment.vendor}: KES {payment.amount} - {payment.status}
        </li>
      ))}
    </ul>
    <h3>Cash on Delivery</h3>
    <ul>
      {mockPayments.filter(p => p.type === 'Cash on Delivery').map(payment => (
        <li key={payment.id}>
          {payment.vendor}: KES {payment.amount} - {payment.status}
        </li>
      ))}
    </ul>
    <button>Generate Daily Payout Report (Mock)</button>
    <button style={{ marginLeft: 8 }}>Disburse Vendor Dues (Mock)</button>
  </div>
);

export default AdminPayments;