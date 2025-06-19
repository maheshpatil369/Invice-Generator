import React, { useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceHeader from './InvoiceHeader.jsx';
import InvoiceFooter from './InvoiceFooter.jsx';
import CompanyInfo from './CompanyInfo.jsx';
import InvoiceDetails from './InvoiceDetails.jsx';
import ItemsTable from './ItemsTable.jsx';
import InvoiceTotals from './InvoiceTotals.jsx';
import InvoiceNotes from './InvoiceNotes.jsx';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2024-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    company: {
      name: 'Your Company Name',
      address: '123 Business Street',
      city: 'Business City, BC 12345',
      email: 'contact@yourcompany.com',
      phone: '+1 (555) 123-4567'
    },
    client: {
      name: 'Client Company',
      address: '456 Client Avenue',
      city: 'Client City, CC 67890',
      email: 'billing@clientcompany.com'
    },
    items: [
      {
        id: 1,
        description: 'Web Development Services',
        quantity: 1,
        rate: 2500.00
      },
      {
        id: 2,
        description: 'UI/UX Design',
        quantity: 1,
        rate: 1500.00
      }
    ],
    notes: 'Thank you for your business! Payment is due within 30 days.',
    taxRate: 0.08
  });

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: '',
      quantity: 1,
      rate: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id, field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const setNotes = (notes) => {
    setInvoiceData(prev => ({ ...prev, notes }));
  };

  const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const taxAmount = subtotal * invoiceData.taxRate;
  const total = subtotal + taxAmount;

  const downloadPDF = async () => {
    const element = document.getElementById('invoice-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Download Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Invoice Generator</h1>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Invoice Content */}
        <div id="invoice-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <InvoiceHeader 
            invoiceNumber={invoiceData.invoiceNumber}
            date={invoiceData.date}
          />

          <div className="p-8">
            <CompanyInfo 
              company={invoiceData.company}
              client={invoiceData.client}
            />

            <InvoiceDetails 
              date={invoiceData.date}
              dueDate={invoiceData.dueDate}
            />

            <ItemsTable 
              items={invoiceData.items}
              addItem={addItem}
              removeItem={removeItem}
              updateItem={updateItem}
            />

            <InvoiceTotals 
              subtotal={subtotal}
              taxRate={invoiceData.taxRate}
              taxAmount={taxAmount}
              total={total}
            />

            <InvoiceNotes 
              notes={invoiceData.notes}
              setNotes={setNotes}
            />

            <InvoiceFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;