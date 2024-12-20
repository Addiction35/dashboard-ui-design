import { useState } from 'react';
import { FaPlus, FaEllipsisV, FaTimes } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Wages = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPdfOverlay, setShowPdfOverlay] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState('warehouse');
  const [selectedItems, setSelectedItems] = useState([]);

  const wages = [
    {
      date: '2024-12-19',
      project: 'Project Alpha',
      wage: 'WG-12345',
      reference: 'Ref123',
      amount: '$1,200',
      vendorName: 'Vendor A',
      status: 'Waiting Approval',
      deliveryDate: '2024-12-25',
      companyName: 'Company XYZ',
    },
    // Add more dummy purchase orders
  ];
  const generatePDF = async () => {
    const pdf = new jsPDF();
    const pdfContent = document.getElementById('pdf-content'); // Ensure this ID matches the content you want to capture
  
    const canvas = await html2canvas(pdfContent);
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190; // Adjust width as needed
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
  
    let position = 0;
  
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  
    pdf.save('expenses.pdf');
  };

  const handleAddItem = () => {
    setSelectedItems((prevItems) => [
      ...prevItems,
      { details: '', account: '', quantity: '', rate: '', vat: '', amount: '' },
    ]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleClosePdfOverlay = () => {
    setShowPdfOverlay(false);
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Wages</h1>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="inline mr-2" /> Add New
          </button>
          <FaEllipsisV className="cursor-pointer text-gray-600 hover:text-gray-800" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Project</th>
              <th className="px-4 py-2 border">Wages</th>
              <th className="px-4 py-2 border">Reference</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Vendor Name</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Delivery Date</th>
              <th className="px-4 py-2 border">Company Name</th>
            </tr>
          </thead>
          <tbody>
            {wages.map((order, index) => (
              <tr key={index} onClick={() => setShowPdfOverlay(true)} className="cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2 border">{order.date}</td>
                <td className="px-4 py-2 border">{order.project}</td>
                <td className="px-4 py-2 border">{order.wage}</td>
                <td className="px-4 py-2 border">{order.reference}</td>
                <td className="px-4 py-2 border">{order.amount}</td>
                <td className="px-4 py-2 border">{order.vendorName}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">{order.deliveryDate}</td>
                <td className="px-4 py-2 border">{order.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Wage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Select Vendor</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block mb-1">Delivery Address</label>
                <div className="flex gap-4 items-center">
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value="warehouse"
                      checked={selectedDelivery === 'warehouse'}
                      onChange={() => setSelectedDelivery('warehouse')}
                    />{' '}
                    Warehouse
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value="customer"
                      checked={selectedDelivery === 'customer'}
                      onChange={() => setSelectedDelivery('customer')}
                    />{' '}
                    Customer
                  </label>
                </div>
              </div>

              {selectedDelivery === 'warehouse' && (
                <div>
                  <label className="block mb-1">Available Warehouses</label>
                  <select className="w-full border rounded p-2">
                    <option>Warehouse A</option>
                    <option>Warehouse B</option>
                  </select>
                </div>
              )}
              {selectedDelivery === 'customer' && (
                <div>
                  <label className="block mb-1">Customer Address</label>
                  <textarea className="w-full border rounded p-2"></textarea>
                </div>
              )}

              <div>
                <label className="block mb-1">Wages</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block mb-1">Reference</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block mb-1">Date</label>
                <input type="date" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block mb-1">Delivery Date</label>
                <input type="date" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block mb-1">Projects</label>
                <select className="w-full border rounded p-2">
                  <option>Project Alpha</option>
                  <option>Project Beta</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Shipment Preference</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block mb-1">Payment Terms</label>
                <select className="w-full border rounded p-2">
                  <option>Net 30</option>
                  <option>Net 60</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Main Supplier</label>
                <input type="text" className="w-full border rounded p-2" required />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold mb-2">Items</h3>
              <table className="w-full border">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Details</th>
                    <th className="border px-2 py-1">Account</th>
                    <th className="border px-2 py-1">Quantity</th>
                    <th className="border px-2 py-1">Rate</th>
                    <th className="border px-2 py-1">VAT</th>
                    <th className="border px-2 py-1">Amount</th>
                    <th className="border px-2 py-1">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">
                        <input type="text" className="w-full border rounded p-1" />
                      </td>
                      <td className="border px-2 py-1">
                        <input type="text" className="w-full border rounded p-1" />
                      </td>
                      <td className="border px-2 py-1">
                        <input type="number" className="w-full border rounded p-1" />
                      </td>
                      <td className="border px-2 py-1">
                        <input type="number" className="w-full border rounded p-1" />
                      </td>
                      <td className="border px-2 py-1">
                        <input type="number" className="w-full border rounded p-1" />
                      </td>
                      <td className="border px-2 py-1">
                        <input type="number" className="w-full border rounded p-1" />
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleAddItem}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Item
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showPdfOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 h-5/6 p-4 rounded-lg relative overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={handleClosePdfOverlay}
      >
        <FaTimes size={20} />
      </button>
      <h2 className="text-xl font-bold mb-4">Wage Details</h2>
      <div id="pdf-content" className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Details</th>
              <th className="px-4 py-2 border">Account</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Rate</th>
              <th className="px-4 py-2 border">VAT</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.details}</td>
                <td className="px-4 py-2 border">{item.account}</td>
                <td className="px-4 py-2 border">{item.quantity}</td>
                <td className="px-4 py-2 border">{item.rate}</td>
                <td className="px-4 py-2 border">{item.vat}</td>
                <td className="px-4 py-2 border">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={generatePDF}
      >
        Generate PDF
      </button>
    </div>
  </div>
      )}
    </div>
  );
};

export default Wages;