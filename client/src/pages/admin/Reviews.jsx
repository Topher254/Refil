import React from 'react';

const mockReviews = [
  { id: 1, vendor: 'Pro Gas Station', customer: 'Alice', rating: 5, comment: 'Great service!', flagged: false },
  { id: 2, vendor: 'SeaGas', customer: 'Bob', rating: 2, comment: 'Late delivery.', flagged: true },
];

const AdminReviews = () => (
  <div style={{ padding: 24 }}>
    <h2>Reviews & Complaints</h2>
    <ul>
      {mockReviews.map(review => (
        <li key={review.id}>
          <b>{review.vendor}</b> - {review.customer}: {review.comment} (Rating: {review.rating}/5)
          {review.flagged && <span style={{ color: 'red', marginLeft: 8 }}>[Flagged]</span>}
          <button style={{ marginLeft: 8 }}>Moderate</button>
        </li>
      ))}
    </ul>
    <div style={{ marginTop: 16 }}>
      <b>Highlight top-rated vendors on homepage</b>
    </div>
  </div>
);

export default AdminReviews;