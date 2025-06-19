import React from 'react';

const InvoiceNotes = ({ notes, setNotes }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold text-gray-800 mb-3">Notes</h3>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-transparent border-none outline-none resize-none text-gray-700"
          rows="3"
          placeholder="Add any additional notes here..."
        />
      </div>
    </div>
  );
};

export default InvoiceNotes;