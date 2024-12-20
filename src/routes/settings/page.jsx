import { Bell, Lock, User, Shield,  Save } from "lucide-react";
import  { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    profileVisibility: "public",
    dataSharing: true,
    locationServices: false,
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <main className="min-h-screen bg-gray-50 p-2 dark:bg-blue-700/20 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl dark:text-blue-600 font-bold mb-4 sm:mb-6 md:mb-8">
          Settings
        </h1>

        <section className="bg-white rounded-lg dark:bg-blue-500/20 shadow p-4 sm:p-6 md:p-8">
          <div className="flex items-center dark:text-blue-600  gap-2 mb-4 sm:mb-6">
            <User className="h-5 w-5" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Profile Information
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-500 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 dark:bg-gray-400 sm:py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-500 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-2 text-base border dark:bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-500 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-2 text-base border dark:bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg dark:bg-blue-500/20 dark:text-blue-500 shadow p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Lock className="h-5 w-5" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Account Security
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-500 mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border dark:bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-500 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border dark:bg-gray-400 border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-500 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border dark:bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-blue-500/20 dark:text-blue-500 rounded-lg shadow p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-base sm:text-lg">
                  Email Notifications
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-14 sm:w-11 h-8 sm:h-6 dark:bg-gray-400 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>
        <div className="flex justify-end py-4">
          <button
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-2 bg-blue-600 text-white dark:bg-blue-400/20 dark:text-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="h-4 w-4 " />
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

