import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Project from "@/routes/project/page";
import Analytics from "./routes/analytics/page";
import PurchaseOrders from "./routes/purchase-order/page";
import Expenses from "./routes/expenses/page";
import Wages from "./routes/wages/page";
import SettingsPage from "./routes/settings/page";
import Users from "./routes/users/page";
import VendorList from "./routes/vendors/page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <Analytics />,
                },
                {
                    path: "projects",
                    element: <Project />,
                },
                {
                    path: "items",
                    element: <h1>items page</h1>,
                },
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "new-user",
                    element: <h1 className="title">New Customer</h1>,
                },
                {
                    path: "vendors",
                    element: <VendorList />,
                },
                {
                    path: "purchase-order",
                    element: <PurchaseOrders />,
                },
                {
                    path: "expenses",
                    element: <Expenses />,
                },
                {
                    path: "wages",
                    element: <Wages />,
                },
                {
                    path: "settings",
                    element: <SettingsPage />,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
