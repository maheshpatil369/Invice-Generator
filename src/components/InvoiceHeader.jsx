import React from 'react';
import { Building2, Hash, Calendar } from 'lucide-react';

const InvoiceHeader = ({ invoiceNumber, date }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-blue-100 text-sm">Professional Services</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <Hash className="w-4 h-4" />
            <span className="text-sm font-medium">{invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;