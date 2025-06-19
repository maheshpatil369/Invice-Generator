import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ItemsTable = ({ items, addItem, removeItem, updateItem }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Items & Services</h3>
        <button
          onClick={addItem}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700 border-b">Description</th>
              <th className="text-center p-4 font-semibold text-gray-700 border-b w-24">Qty</th>
              <th className="text-right p-4 font-semibold text-gray-700 border-b w-32">Rate</th>
              <th className="text-right p-4 font-semibold text-gray-700 border-b w-32">Amount</th>
              <th className="w-12 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                <td className="p-4 border-b">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full border-none outline-none bg-transparent font-medium text-gray-800"
                    placeholder="Enter description..."
                  />
                </td>
                <td className="p-4 border-b text-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-16 text-center border-none outline-none bg-transparent"
                    min="0"
                  />
                </td>
                <td className="p-4 border-b text-right">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="w-24 text-right border-none outline-none bg-transparent"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td className="p-4 border-b text-right font-semibold text-gray-800">
                  ₹{(item.quantity * item.rate).toFixed(2)}
                </td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;