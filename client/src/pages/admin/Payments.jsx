import React from 'react';
import { UseAppContext } from '../../context/context';

const AdminPayments = () => {
  const { payments } = UseAppContext();
  return (
    <div style={{ padding: 24 }}>
      <h2>Payments Reconciliation</h2>
      <h3>M-Pesa Payments</h3>
      <ul>
        {payments.filter(p => p.type === 'M-Pesa').map(payment => (
          <li key={payment.id}>
            {payment.vendor}: KES {payment.amount} - {payment.status}
          </li>
        ))}
      </ul>
      <h3>Cash on Delivery</h3>
      <ul>
        {payments.filter(p => p.type === 'Cash on Delivery').map(payment => (
          <li key={payment.id}>
            {payment.vendor}: KES {payment.amount} - {payment.status}
          </li>
        ))}
      </ul>
      <button>Generate Daily Payout Report (Mock)</button>
      <button style={{ marginLeft: 8 }}>Disburse Vendor Dues (Mock)</button>
    </div>
  );
};

export default AdminPayments;