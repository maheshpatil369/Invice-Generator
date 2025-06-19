import React from 'react';

const InvoiceFooter = () => {
  return (
    <div className="text-center mt-8 pt-6 border-t text-sm text-gray-500">
      <p>Thank you for your business!</p>
      <p className="mt-1">This invoice was generated on {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default InvoiceFooter;