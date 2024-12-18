import { Trash2, Eye, Plus, X, Upload } from "lucide-react";
import  { useState } from "react";

const Project = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects] = useState([
    {
      id: 1,
      date: "2024-01-15",
      name: "Website Redesign",
      budget: 50000,
      description: "Complete overhaul of company website with new branding",
      subprojects: [
        {
          name: "UI Design",
          budget: 15000,
        },
        {
          name: "Frontend Development",
          budget: 20000,
        },
        {
          name: "Backend Integration",
          budget: 15000,
        },
      ],
    },
    {
      id: 2,
      date: "2024-02-01",
      name: "Mobile App Development",
      budget: 75000,
      description: "Native mobile app for iOS and Android platforms",
      subprojects: [
        {
          name: "iOS Development",
          budget: 35000,
        },
        {
          name: "Android Development",
          budget: 35000,
        },
        {
          name: "QA Testing",
          budget: 5000,
        },
      ],
    },
    {
      id: 3,
      date: "2024-03-10",
      name: "Data Analytics Platform",
      budget: 100000,
      description: "Build custom analytics dashboard for business intelligence",
      subprojects: [
        {
          name: "Data Architecture",
          budget: 30000,
        },
        {
          name: "Frontend Dashboard",
          budget: 40000,
        },
        {
          name: "API Development",
          budget: 30000,
        },
      ],
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    budget: "",
    description: "",
    files: [],
    subprojects: [],
  });
  const [viewProject, setViewProject] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const sortData = (data) => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };
  const filterData = (data) => {
    return data.filter((project) => {
      const nameMatch = project.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const dateMatch = !filters.date || project.date.includes(filters.date);
      return nameMatch && dateMatch;
    });
  };
  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };
  const generatePDF = (project) => {
    const content = `
      Project: ${project.name}
      Date: ${project.date}
      Budget: $${project.budget.toLocaleString()}
      Description: ${project.description}
      
      Subprojects:
      ${project.subprojects
        .map(
          (sub) => `
        - ${sub.name}
        Budget: $${sub.budget}
        ${sub.description ? `Description: ${sub.description}` : ""}
      `,
        )
        .join("\n")}
    `;
    const blob = new Blob([content], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name}-report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  const handleAddSubproject = () => {
    setFormData({
      ...formData,
      subprojects: [
        ...formData.subprojects,
        {
          name: "",
          budget: "",
          description: "",
        },
      ],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setFormData({
      name: "",
      date: "",
      budget: "",
      description: "",
      files: [],
      subprojects: [],
    });
  };
  return (
    <main className="container mx-auto p-4 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects Overview</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Create New Project
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Name
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            value={filters.name}
            onChange={(e) =>
              setFilters({
                ...filters,
                name: e.target.value,
              })
            }
            placeholder="Search by project name..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Date
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            value={filters.date}
            onChange={(e) =>
              setFilters({
                ...filters,
                date: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        onClick={() => {
          setFilters({
            name: "",
            date: "",
          });
          setSortConfig({
            key: null,
            direction: "asc",
          });
          setCurrentPage(1);
        }}
        className="mb-4 px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-50"
      >
        Clear Filters
      </button>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 ">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSortConfig({
                    key: "date",
                    direction:
                      sortConfig.key === "date" &&
                      sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  });
                }}
              >
                Date{" "}
                {sortConfig.key === "date" && (
                  <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSortConfig({
                    key: "name",
                    direction:
                      sortConfig.key === "name" &&
                      sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  });
                }}
              >
                Project Name{" "}
                {sortConfig.key === "name" && (
                  <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget Allocated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(() => {
              const filteredData = filterData(projects);
              const sortedData = sortData(filteredData);
              const paginatedData = paginateData(sortedData);
              return paginatedData.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{project.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="p-1 text-blue-500 hover:text-blue-700"
                        onClick={() => setViewProject(project)}
                      >
                        <Eye size={20} />
                      </button>
                      <label className="p-1 text-green-500 hover:text-green-700 cursor-pointer">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            console.log("Files:", e.target.files);
                          }}
                        />
                        <Upload size={20} />
                      </label>
                      <button className="p-1 text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filterData(projects).length)} of{" "}
          {filterData(projects).length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from(
            {
              length: Math.ceil(filterData(projects).length / itemsPerPage),
            },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded hover:bg-gray-100 ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
              >
                {i + 1}
              </button>
            ),
          )}
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(
                  Math.ceil(filterData(projects).length / itemsPerPage),
                  p + 1,
                ),
              )
            }
            disabled={
              currentPage ===
              Math.ceil(filterData(projects).length / itemsPerPage)
            }
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Project</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        budget: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Files
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setFormData({
                                ...formData,
                                files: [...formData.files, ...files],
                              });
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Any file up to 10MB
                      </p>
                      {formData.files.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700">
                            Selected files:
                          </h4>
                          <ul className="mt-2 divide-y divide-gray-200">
                            {formData.files.map((file, index) => (
                              <li
                                key={index}
                                className="py-2 flex justify-between items-center"
                              >
                                <span className="text-sm text-gray-500">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFiles = formData.files.filter(
                                      (_, i) => i !== index,
                                    );
                                    setFormData({
                                      ...formData,
                                      files: newFiles,
                                    });
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subprojects
                  </label>
                  {formData.subprojects.length > 0 && (
                    <div className="space-y-4 mb-4">
                      {formData.subprojects.map((subproject, index) => (
                        <div
                          key={index}
                          className="grid gap-2 p-4 border rounded-lg bg-gray-50"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Subproject Name"
                              className="p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                              value={subproject.name}
                              onChange={(e) => {
                                const newSubprojects = [
                                  ...formData.subprojects,
                                ];
                                newSubprojects[index].name = e.target.value;
                                setFormData({
                                  ...formData,
                                  subprojects: newSubprojects,
                                });
                              }}
                            />
                            <input
                              type="number"
                              placeholder="Budget"
                              className="p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                              value={subproject.budget}
                              onChange={(e) => {
                                const newSubprojects = [
                                  ...formData.subprojects,
                                ];
                                newSubprojects[index].budget = e.target.value;
                                setFormData({
                                  ...formData,
                                  subprojects: newSubprojects,
                                });
                              }}
                            />
                          </div>
                          <textarea
                            placeholder="Subproject Description"
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                            value={subproject.description}
                            onChange={(e) => {
                              const newSubprojects = [...formData.subprojects];
                              newSubprojects[index].description =
                                e.target.value;
                              setFormData({
                                ...formData,
                                subprojects: newSubprojects,
                              });
                            }}
                          />
                          <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subproject Files
                            </label>
                            <div className="flex items-center gap-2">
                              <label className="flex-1 cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <span>Upload files</span>
                                <input
                                  type="file"
                                  className="sr-only "
                                  multiple
                                  onChange={(e) => {
                                    const files = Array.from(
                                      e.target.files || [],
                                    );
                                    const newSubprojects = [
                                      ...formData.subprojects,
                                    ];
                                    newSubprojects[index].files = [
                                      ...(newSubprojects[index].files || []),
                                      ...files,
                                    ];
                                    setFormData({
                                      ...formData,
                                      subprojects: newSubprojects,
                                    });
                                  }}
                                />
                              </label>
                            </div>
                            {subproject.files &&
                              subproject.files.length > 0 && (
                                <ul className="mt-2 divide-y divide-gray-200">
                                  {subproject.files.map((file, fileIndex) => (
                                    <li
                                      key={fileIndex}
                                      className="py-2 flex justify-between items-center"
                                    >
                                      <span className="text-sm text-gray-500">
                                        {file.name}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newSubprojects = [
                                            ...formData.subprojects,
                                          ];
                                          newSubprojects[index].files =
                                            newSubprojects[index].files.filter(
                                              (_, i) => i !== fileIndex,
                                            );
                                          setFormData({
                                            ...formData,
                                            subprojects: newSubprojects,
                                          });
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <X size={16} />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleAddSubproject}
                    className={`flex items-center gap-2 ${formData.subprojects.length === 0 ? "w-full justify-center py-3 border-2 border-dashed border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50" : "text-blue-500 hover:text-blue-700 text-sm"}`}
                  >
                    <Plus size={16} />
                    {formData.subprojects.length === 0
                      ? "Add Your First Subproject"
                      : "Add Another Subproject"}
                  </button>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Project Details</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => generatePDF(viewProject)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Generate PDF
                </button>
                <button
                  onClick={() => setViewProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Project Information</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{viewProject.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{viewProject.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">
                      ${viewProject.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1">{viewProject.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Subprojects</h3>
                <div className="mt-2 space-y-4">
                  {viewProject.subprojects.map((subproject, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{subproject.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Budget</p>
                          <p className="font-medium">
                            ${subproject.budget.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {subproject.description && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Description</p>
                          <p className="mt-1">{subproject.description}</p>
                        </div>
                      )}
                      {subproject.files && subproject.files.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">Files</p>
                          <ul className="mt-1 space-y-1">
                            {subproject.files.map((file, fileIndex) => (
                              <li
                                key={fileIndex}
                                className="text-sm text-blue-500"
                              >
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
