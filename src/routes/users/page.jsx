import {
    Search,
    Plus,
    Eye,
    Trash2,
    X,
  } from "lucide-react";
  import { useState } from "react";
 
  export default function Users() {
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
      currentEmailChange: "",
      newEmail: "",
      confirmNewEmail: "",
    });
    const [users, setUsers] = useState([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234-567-8900",
        role: "Admin",
      },
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
    const handleAddUser = () => {
      setShowAddModal(true);
    };
    const handleViewUser = (user) => {
      setSelectedUser(user);
      setShowViewModal(true);
    };
    const handleDeleteUser = (user) => {
      setSelectedUser(user);
      setShowDeleteModal(true);
    };
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-blue-500/20 p-3 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
  
            <button
              onClick={handleAddUser}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add User
            </button>
          </div>
  
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-xl w-full dark:bg-blue-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl dark:text-blue-500 font-semibold">Add New User</h2>
                  <button onClick={() => setShowAddModal(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
  
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <select
                      className="w-full px-3 py-2 border dark:text-gray-500 dark:bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newUser.role}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="User">PO officer</option>
                    </select>
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border  dark:bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.firstName}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium dark:text-gray-500  text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300  dark:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.lastName}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium dark:text-gray-500  text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border  dark:bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 dark:bg-gray-300rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.phone}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300  dark:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300  dark:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.confirmPassword}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
  
                  <div className="flex justify-end gap-4 mt-6">
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Save as Draft
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Create User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
  
          {showViewModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-lg w-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">User Details</h2>
                  <button onClick={() => setShowViewModal(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
  
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        First Name
                      </p>
                      <p className="text-base">{selectedUser.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Last Name
                      </p>
                      <p className="text-base">{selectedUser.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Email
                      </p>
                      <p className="text-base">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Phone Number
                      </p>
                      <p className="text-base">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Role
                      </p>
                      <p className="text-base">{selectedUser.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
  
          {showDeleteModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-blue-600/20 rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-semibold mb-4">Delete User</h2>
                <p className="text-gray-600 dark:text-gray-800 mb-6">
                  Are you sure you want to delete this user? This action cannot be
                  undone.
                </p>
  
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  