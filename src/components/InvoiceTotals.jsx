import React from 'react';

const InvoiceTotals = ({ subtotal, taxRate, taxAmount, total }) => {
  return (
    <div className="flex justify-end mb-8">
      <div className="w-full max-w-sm">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%)</span>
              <span className="font-semibold">₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;