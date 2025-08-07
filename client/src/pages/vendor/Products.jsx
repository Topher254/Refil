import React from 'react';
import { UseAppContext } from '../../context/context';

const VendorProducts = () => {
  const { vendors } = UseAppContext();
  const vendor = vendors?.gas?.[0] || {};
  return (
    <div style={{ padding: 24 }}>
      <h2>Product Management</h2>
      <ul>
        {vendor.products?.map(product => (
          <li key={product._id}>
            <b>{product.name}</b> - KES {product.finalPrice} ({product.size})
            <button style={{ marginLeft: 8 }}>Edit</button>
            <button style={{ marginLeft: 4 }}>Delete</button>
          </li>
        ))}
      </ul>
      <button>Add New Product (Mock)</button>
    </div>
  );
};

export default VendorProducts;