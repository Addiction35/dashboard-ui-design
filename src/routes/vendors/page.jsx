import { Plus, Phone, Mail, MapPin, Briefcase, X } from "lucide-react";
import  { useState } from "react";

export default function VendorList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendors] = useState([
    {
      id: 1,
      name: "Tech Solutions Inc",
      logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=250&h=250&fit=crop",
      email: "contact@techsolutions.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      address: "123 Tech Street, Suite 100",
      services: ["IT Consulting", "Software Development", "Cloud Solutions"],
     
    },
    {
      id: 2,
      name: "Creative Design Studio",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=250&h=250&fit=crop",
      email: "hello@creativedesign.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      address: "456 Design Avenue, Floor 4",
      services: ["Graphic Design", "Web Design", "Branding"],

    },
    {
      id: 3,
      name: "Global Logistics Partners",
      logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=250&h=250&fit=crop",
      email: "info@globallogistics.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      address: "789 Logistics Boulevard",
      services: ["Supply Chain Management", "Warehousing", "Distribution"],

    },
  ]);
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
          aria-label="Add new vendor"
        >
          <Plus size={20} />
          <span>Add Vendor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <article
            key={vendor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={vendor.logo}
                alt={`${vendor.name} logo`}
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{vendor.name}</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-gray-500" />
                  <a
                    href={`mailto:${vendor.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {vendor.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-gray-500" />
                  <a
                    href={`tel:${vendor.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {vendor.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-500" />
                  <div className="flex flex-col">
                    <span>{vendor.location}</span>
                    <span className="text-sm text-gray-600">
                      {vendor.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Briefcase size={18} className="text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Services:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {vendor.services.map((service, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="text-xl font-semibold">
                Add New Vendor
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
            <div className="relative">
                <input id="vendorname" name="vendorname" type="text" placeholder="" className=" w-full border-b text-gray-700 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit" />
                <label htmlFor="vendername" className="absolute -top-2 text-sm left-0 cursor-text peer-focus:text-sm peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm">
                    Name
                </label>
            </div>

            <div className="relative">
                <input id="Email" name="Email" type="email" placeholder="" className="w-full border-b text-gray-700 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit" />
                <label htmlFor="Email" className="absolute -top-2 text-sm left-0 cursor-text peer-focus:text-sm peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm">
                    Email
                </label>
            </div>

            <div className="relative">
                <input id="phone" name="phone" type="tel" placeholder="" className=" w-full border-b text-gray-700 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit" />
                <label htmlFor="phone" className="absolute -top-2 text-sm left-0 cursor-text peer-focus:text-sm peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm">
                    Phone
                </label>
            </div>


            <div className="relative">
                <input id="location" name="location" type="text" placeholder="" className=" w-full border-b text-gray-700 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit" />
                <label htmlFor="location" className="absolute -top-2 text-sm left-0 cursor-text peer-focus:text-sm peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm">
                    Location
                </label>
            </div>

            <div className="relative">
                <input id="address" name="address" type="text" placeholder="" className="border-b text-gray-700 border-gray-300 py-1 focus:border-b-2 focus:border-blue-700  w-full transition-colors focus:outline-none peer bg-inherit" />
                <label htmlFor="address" className="absolute -top-2 text-sm left-0 cursor-text peer-focus:text-sm peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm">
                    Address
                </label>
            </div>

              <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <label className="text-gray-500" htmlFor="label">vendor logo</label>
                    <div className="md:flex">
                        <div className="w-full p-3">
                        <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <div className="absolute flex flex-col items-center">
                            <img alt="File Icon" className="mb-3" src="https://img.icons8.com/dusk/64/000000/file.png" />
                            <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
                            <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                            </div>
                            <input name className="h-full w-full opacity-0 cursor-pointer" type="file" />
                        </div>
                        </div>
                    </div>
                </div>


              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}




