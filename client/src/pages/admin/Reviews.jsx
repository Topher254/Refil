import React from 'react';
import { UseAppContext } from '../../context/context';

const AdminReviews = () => {
  const { reviews } = UseAppContext();

  return (
    <div style={{ padding: 24 }}>
      <h2>Reviews & Complaints</h2>
      <ul>
        {reviews.map(review => (
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
};

export default AdminReviews;