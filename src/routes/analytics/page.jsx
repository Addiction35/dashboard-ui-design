import {
    TrendingUp,
    DollarSign,
    Users,
    Clock,
    CheckCircle,
    AlertTriangle,
  } from "lucide-react";
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
  export default function Analytics() {
    const financialData = {
      totalBudget: 1500000,
      usedAmount: 875000,
      wages: 450000,
      expenses: 325000,
    };
    const projectStats = {
      completed: 12,
      ongoing: 8,
      delayed: 3,
      totalProjects: 23,
    };
    const lineChartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Budget Utilization",
          data: [65000, 89000, 103000, 95000, 110000, 98000],
          borderColor: "#3b82f6",
          tension: 0.4,
        },
      ],
    };
    const projectStatusData = {
      labels: ["Completed", "On Track", "Delayed"],
      datasets: [
        {
          data: [12, 8, 3],
          backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"],
        },
      ],
    };
    const expenseBreakdown = {
      labels: [
        "Employee Wages",
        "Contractor Wages",
        "Equipment Purchase",
        "Software Licenses",
        "Office Expenses",
        "Purchase Orders",
        "Maintenance",
      ],
      datasets: [
        {
          label: "Expense Distribution",
          data: [350000, 100000, 125000, 95000, 45000, 180000, 30000],
          backgroundColor: [
            "#3b82f6",
            "#22c55e",
            "#eab308",
            "#ec4899",
            "#8b5cf6",
            "#f97316",
            "#64748b",
          ],
        },
      ],
    };
    const expenseTracking = {
      wages: {
        employees: 350000,
        contractors: 100000,
        total: 450000,
      },
      purchases: {
        equipment: 125000,
        software: 95000,
        office: 45000,
        total: 265000,
      },
      purchaseOrders: {
        pending: 75000,
        completed: 105000,
        total: 180000,
      },
    };
    const commonChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#666",
            font: {
              size: 11,
            },
          },
          grid: {
            color: "#e5e7eb",
          },
        },
        x: {
          ticks: {
            color: "#666",
            font: {
              size: 11,
            },
          },
          grid: {
            color: "#e5e7eb",
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#666",
            padding: 16,
            font: {
              size: 12,
            },
          },
        },
      },
    };
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 lg:mb-8">
            Analytics Dashboard
          </h1>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Total Budget</p>
                  <p className="text-2xl font-bold">
                    ${financialData.totalBudget.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="text-blue-500" size={24} />
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Amount Used</p>
                  <p className="text-2xl font-bold">
                    ${financialData.usedAmount.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Completed Projects</p>
                  <p className="text-2xl font-bold">{projectStats.completed}</p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Delayed Projects</p>
                  <p className="text-2xl font-bold">{projectStats.delayed}</p>
                </div>
                <AlertTriangle className="text-red-500" size={24} />
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Budget Utilization Trend
              </h2>
              <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
                <Line data={lineChartData} options={commonChartOptions} />
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Project Status Distribution
              </h2>
              <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
                <Doughnut data={projectStatusData} options={commonChartOptions} />
              </div>
            </div>
          </div>
  
          <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Expense Breakdown
            </h2>
            <div className="h-[300px] sm:h-[400px]">
              <Bar data={expenseBreakdown} options={commonChartOptions} />
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Resource Allocation
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span>Team Members</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Projects</span>
                  <span className="font-semibold">{projectStats.ongoing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Project Duration</span>
                  <span className="font-semibold">3.5 months</span>
                </div>
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Financial Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Monthly Burn Rate</span>
                  <span className="font-semibold">$145,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Project Cost</span>
                  <span className="font-semibold">$65,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ROI</span>
                  <span className="font-semibold">24.5%</span>
                </div>
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Efficiency Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>On-time Completion</span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Budget Accuracy</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Resource Utilization</span>
                  <span className="font-semibold">85%</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Wage Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Employee Wages
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.wages.employees.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Contractor Wages
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.wages.contractors.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total Wages
                  </span>
                  <span className="dark:text-white">${expenseTracking.wages.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Purchase Orders
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Pending Orders
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.purchaseOrders.pending.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Completed Orders
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.purchaseOrders.completed.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-600 dark:text-gray-300">
                    Total PO Value
                  </span>
                  <span className="dark:text-white">
                    ${expenseTracking.purchaseOrders.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
  
            <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Other Expenses
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Equipment
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.purchases.equipment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    Software
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.purchases.software.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">
                    transport Expenses
                  </span>
                  <span className="font-semibold dark:text-white">
                    ${expenseTracking.purchases.office.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-600 dark:text-gray-300">Total</span>
                  <span className="dark:text-white">${expenseTracking.purchases.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  