import React from 'react';

const mockReviews = [
  { id: 1, customer: 'Alice', rating: 5, comment: 'Great service!' },
  { id: 2, customer: 'Bob', rating: 4, comment: 'Quick delivery.' },
  { id: 3, customer: 'Carol', rating: 5, comment: 'Very reliable.' },
];

const VendorReviews = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2>Reviews & Ratings</h2>
      <ul>
        {mockReviews.map(review => (
          <li key={review.id}>
            <b>{review.customer}</b>: {review.comment} (Rating: {review.rating}/5)
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16 }}>
        <b>Appear on homepage under Best Vendors (based on rating or premium)</b>
      </div>
    </div>
  );
};

export default VendorReviews;