import React from 'react';
import { UseAppContext } from '../../context/context';

const VendorProfile = () => {
  const { vendors } = UseAppContext();
  const vendor = vendors?.gas?.[0] || {};
  return (
    <div style={{ padding: 24 }}>
      <h2>Complete Your Profile</h2>
      <div><b>Brand(s) Sold:</b> {vendor.brand}</div>
      <div><b>Product Pricing:</b> {vendor.products?.map(p => `${p.name}: KES ${p.finalPrice}`).join(', ')}</div>
      <div><b>Delivery Radius:</b> {vendor.deliveryRadius}</div>
      <div><b>Delivery Fee:</b> KES {vendor.deliveryFee || vendor.deliveryFeePerRadius || vendor.deliveryFee}</div>
      <div><b>Payment Details:</b> {vendor.paymentMethods?.join(', ') || 'Till/Paybill not set'}</div>
      <button>Update Profile (Mock)</button>
    </div>
  );
};

export default VendorProfile;