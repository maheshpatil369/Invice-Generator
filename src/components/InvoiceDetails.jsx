import React from 'react';

const InvoiceDetails = ({ date, dueDate }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-6 mb-8">
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-1">Invoice Date</h4>
        <p className="text-blue-700">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="bg-orange-50 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 mb-1">Due Date</h4>
        <p className="text-orange-700">{new Date(dueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default InvoiceDetails;