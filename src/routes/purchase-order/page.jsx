import {
    TrendingUp,
    DollarSign,
    Users,
    Clock,
    CheckCircle,
    AlertTriangle,
    Eye,
    FileText,
    Check,
    X,
    Download,
    Search,
  } from "lucide-react";
  import React, { useState } from "react";
  import { render } from "react-dom";
  import { Line, Doughnut, Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
  } from "chart.js";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
  );
  export default function PurchaseOrders() {
    const [selectedPO, setSelectedPO] = useState(null);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const purchaseOrders = [
      {
        id: "PO-2024-001",
        dateCreated: "2024-01-15",
        projectName: "Website Redesign",
        description: "Design software licenses and tools",
        files: ["requirements.pdf", "quote.pdf"],
        billStatus: "Pending",
        approvalStatus: "Pending",
        amount: 15000,
        vendor: "Adobe Systems",
        requestedBy: "John Doe",
      },
      // ... more purchase order data
    ];
    const handleApprove = (poId) => {
      console.log("Approved:", poId);
      setShowPdfPreview(false);
    };
    const handleDecline = (poId) => {
      console.log("Declined:", poId);
      setShowPdfPreview(false);
    };
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case "Approved":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "Declined":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        default:
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      }
    };
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Purchase Orders
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search PO..."
                className="pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
  
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {purchaseOrders.map((po) => (
                  <tr key={po.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(po.approvalStatus)}`}
                      >
                        {po.approvalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedPO(po);
                          setShowPdfPreview(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {showPdfPreview && selectedPO && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Purchase Order Details
                    </h2>
                    <button
                      onClick={() => setShowPdfPreview(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X size={24} />
                    </button>
                  </div>
  
                  {selectedPO.approvalStatus === "Approved" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-30deg]">
                      <div className="border-8 border-green-500 rounded-lg px-8 py-4 opacity-30">
                        <span className="text-green-500 text-6xl font-bold">
                          APPROVED
                        </span>
                      </div>
                    </div>
                  )}
  
                  {selectedPO.approvalStatus === "Pending" && (
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => handleDecline(selectedPO.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApprove(selectedPO.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  