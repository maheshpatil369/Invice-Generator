import React from 'react';
import { Building2, User } from 'lucide-react';

const CompanyInfo = ({ company, client, updateClientInfo }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      {/* From */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          From
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-bold text-gray-800 text-lg mb-2">{company.name}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {company.address}<br />
            {company.city}<br />
            {company.email}<br />
            {company.phone}
          </p>
        </div>
      </div>

      {/* To */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
          <User className="w-4 h-4" />
          Bill To
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder="Client Company Name"
            value={client.name}
            onChange={(e) => updateClientInfo('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg font-bold text-gray-800"
          />
          <textarea
            placeholder="Client Address"
            value={client.address}
            onChange={(e) => updateClientInfo('address', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-600 leading-relaxed"
            rows="3"
          />
          <input
            type="text"
            placeholder="Client City, State, Zip"
            value={client.city}
            onChange={(e) => updateClientInfo('city', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-600"
          />
          <input
            type="email"
            placeholder="Client Email"
            value={client.email}
            onChange={(e) => updateClientInfo('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;