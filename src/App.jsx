import React, { useState, useEffect } from 'react';
import { Download, Save, History, Trash2, FileX } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceHeader from './components/InvoiceHeader.jsx';
import InvoiceFooter from './components/InvoiceFooter.jsx';
import CompanyInfo from './components/CompanyInfo.jsx';
import InvoiceDetails from './components/InvoiceDetails.jsx';
import ItemsTable from './components/ItemsTable.jsx';
import InvoiceTotals from './components/InvoiceTotals.jsx';
import InvoiceNotes from './components/InvoiceNotes.jsx';

const initialInvoiceState = {
  invoiceNumber: 'INV-001', // Simplified initial invoice number
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
    name: '',
    address: '',
    city: '',
    email: ''
  },
  items: [
    {
      id: Date.now(), // Use Date.now() for initial item to ensure uniqueness if more are added
      description: 'Example Service',
      quantity: 1,
      rate: 100.00
    }
  ],
  notes: 'Thank you for your business! Payment is due within 30 days.',
  taxRate: 0.08
};

function App() {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceState);
  const [savedInvoices, setSavedInvoices] = useState([]);
  const LOCAL_STORAGE_KEY = 'invoiceGeneratorHistory';

  // Load saved invoices from local storage on mount
  useEffect(() => {
    const storedInvoices = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedInvoices) {
      setSavedInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  // Persist savedInvoices to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedInvoices));
  }, [savedInvoices]);


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

  const updateClientInfo = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value
      }
    }));
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

  const saveCurrentInvoice = () => {
    const newSavedInvoice = {
      ...invoiceData,
      savedId: Date.now(), // Unique ID for this saved instance
      savedAt: new Date().toISOString(),
    };
    setSavedInvoices(prev => [newSavedInvoice, ...prev.slice(0, 9)]); // Keep latest 10, add to top
  };

  const loadInvoice = (savedId) => {
    const invoiceToLoad = savedInvoices.find(inv => inv.savedId === savedId);
    if (invoiceToLoad) {
      // Destructure all known properties from the loaded invoice
      // This ensures we only set the properties defined in the original state structure
      const {
        invoiceNumber,
        date,
        dueDate,
        company,
        client,
        items,
        notes,
        taxRate
        // Do not include savedId or savedAt here
      } = JSON.parse(JSON.stringify(invoiceToLoad)); // Deep clone to be safe

      setInvoiceData({
        invoiceNumber,
        date,
        dueDate,
        company, // company, client, and items are already new objects/arrays due to JSON.parse(JSON.stringify())
        client,
        items,
        notes,
        taxRate
      });
    }
  };

  const deleteInvoice = (savedId) => {
    setSavedInvoices(prev => prev.filter(inv => inv.savedId !== savedId));
  };

  const clearForm = () => {
    // Reset to a fresh copy of the initial state
    // Also ensure new Date objects are created for date fields
    setInvoiceData({
        ...initialInvoiceState,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: [ // Give a fresh unique ID for the initial item on clear
          {
            ...initialInvoiceState.items[0],
            id: Date.now()
          }
        ],
        // Reset client fields explicitly if they were part of initialInvoiceState but meant to be truly blank
        client: {
            name: '',
            address: '',
            city: '',
            email: ''
        }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Download Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Invoice Generator</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={saveCurrentInvoice}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Save className="w-5 h-5" />
              Save Invoice
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={clearForm}
              className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <FileX className="w-5 h-5" />
              Clear Form
            </button>
          </div>
        </div>

        {/* Saved Invoices History */}
        {savedInvoices.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <History className="w-6 h-6" />
              Saved Invoices
            </h2>
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {savedInvoices.map((inv) => (
                <li key={inv.savedId} className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {inv.invoiceNumber} - {inv.client.name || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Saved: {new Date(inv.savedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => loadInvoice(inv.savedId)}
                      className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteInvoice(inv.savedId)}
                      className="p-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Invoice Content */}
        <div id="invoice-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden mt-8">
          <InvoiceHeader 
            invoiceNumber={invoiceData.invoiceNumber}
            date={invoiceData.date}
          />

          <div className="p-8">
            <CompanyInfo 
              company={invoiceData.company}
              client={invoiceData.client}
              updateClientInfo={updateClientInfo}
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
}

export default App;
