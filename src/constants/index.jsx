import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, HandCoins, UserPlus, Users } from "lucide-react";

import ProfileImage from "@/assets/profile-image.jpg";
import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/",
            },
            {
                label: "Analytics",
                icon: ChartColumn,
                path: "/analytics",
            },
            {
                label: "Projects",
                icon: NotepadText,
                path: "/projects",
            },
        ],
    },
    {
        title: "Users",
        links: [
            {
                label: "Users",
                icon: Users,
                path: "/customers",
            },
            {
                label: "Add New user",
                icon: UserPlus,
                path: "/new-customer",
            },
        ],
    },
    {
        title: "Finance",
        links: [
            {
                label: "Purchase order",
                icon: Package,
                path: "/products",
            },
            {
                label: "Expenses",
                icon: PackagePlus,
                path: "/new-product",
            },
            {
                label: "Wages",
                icon: HandCoins,
                path: "/inventory",
            },
        ],
    },
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/settings",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: ProfileImage,
        total: 1500,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: ProfileImage,
        total: 2000,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: ProfileImage,
        total: 4000,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: ProfileImage,
        total: 3000,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: ProfileImage,
        total: 2500,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: ProfileImage,
        total: 4500,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: ProfileImage,
        total: 5300,
    },
];

export const topProducts = [
    {
        number: 1,
        name: "Wireless Headphones",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        PO_No: "PO 1339",
        ref : "washroom items",
        price: 99.99,
        vendor : "Emmanuel mukisa",
        status: "Delivered",
        billed: "True",
        D_date: "12 dec",
        company: "uzima nexus",
    },
    {
        number: 2,
        name: "Wireless Headphones",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        PO_No: "PO 1339",
        ref : "washroom items",
        price: 99.99,
        vendor : "Emmanuel mukisa",
        status: "Delivered",
        billed: "True",
        D_date: "12 dec",
        company: "uzima nexus",
    },
    {
        number: 3,
        name: "Wireless Headphones",
        image: ProductImage,
        description: "High-quality noise-canceling wireless headphones.",
        PO_No: "PO 1339",
        ref : "washroom items",
        price: 99.99,
        vendor : "Emmanuel mukisa",
        status: "Delivered",
        billed: "True",
        D_date: "12 dec",
        company: "uzima nexus",
    },
    
];
