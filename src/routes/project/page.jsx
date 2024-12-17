import { useState } from "react";
import { FaTrash, FaEye, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewedProject, setViewedProject] = useState(null);
  const [totalBudget, setTotalBudget] = useState(100000); // Example total budget
  const [newProject, setNewProject] = useState({
    name: "",
    budget: "",
    description: "",
    file: null,
  });

  // Remaining Budget Calculation
  const allocatedBudget = projects.reduce(
    (sum, project) => sum + parseFloat(project.budget || 0),
    0
  );
  const remainingBudget = totalBudget - allocatedBudget;

  // Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleFileUpload = (e) => {
    setNewProject({ ...newProject, file: e.target.files[0] });
  };

  const handleAddProject = () => {
    if (parseFloat(newProject.budget) > remainingBudget) {
      alert("Budget exceeds remaining funds!");
      return;
    }

    setProjects([...projects, newProject]);
    setNewProject({
      name: "",
      budget: "",
      description: "",
      file: null,
    });
    setIsModalOpen(false);
  };

  const handleDeleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleViewProject = (project) => {
    setViewedProject(project);
    setIsViewModalOpen(true);
  };

  const handleGeneratePDF = (project) => {
    const doc = new jsPDF();
    doc.text(`Project Report: ${project.name}`, 14, 16);
    doc.text(`Budget Allocated: $${project.budget}`, 14, 26);
    doc.text("Description:", 14, 36);
    doc.text(project.description, 14, 46);
    doc.save(`${project.name}-report.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <form className="form relative">
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
            <svg width={17} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search" className="w-5 h-5 text-gray-700">
            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
        <input className="input rounded-full px-8 py-3 border-2 border-transparent dark:text-black focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md" placeholder="Search..." required type="text" />
        <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </form>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Project Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Budget Allocated</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{project.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${project.budget}</td>
                  <td className="border border-gray-300 px-4 py-2">{project.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center flex justify-center space-x-4">
                    <FaEye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleViewProject(project)}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteProject(index)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  No projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    {/* Modal for Creating New Project */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">New Project</h2>
      <p className="text-gray-600 mb-4">
        <strong>Total Budget:</strong> KES {totalBudget} | <strong>Remaining Budget:</strong> KES {remainingBudget}
      </p>
      <div className="space-y-4">

        {/* Project Name */}
        <div className="w-full font-mono">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" 
            htmlFor="project-name"
          >
            Project Name
          </label>
          <input
            onChange={handleInputChange}
            value={newProject.name}
            name="name"
            id="project-name"
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter project name"
            type="text"
          />
        </div>

        {/* Budget */}
        <div className="font-mono">
          <label
            htmlFor="currency-input"
            className="block text-xl font-medium text-gray-700 mb-1"
          >
            Budget
          </label>
          <div className="flex h-[34px] text-[14px] text-white/60 w-full items-center bg-[#2f2f61] border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b] transition-all duration-150 ease-in-out">
            <span className="ml-2">KES</span>
            <input
              required
              name="budget"
              value={newProject.budget}
              onChange={handleInputChange}
              className="bg-transparent text-[#f4f4f5] px-3 py-1 focus:outline-none w-full"
              pattern="^[0-9,]*$"
              id="currency-input"
              type="number"
              placeholder="0"
            />
            <span className="mr-2">KSH</span>
          </div>
        </div>

        {/* Project Description */}
        <div className="w-full font-mono">
          <label
            htmlFor="project-description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Project Description
          </label>
          <textarea
            onChange={handleInputChange}
            value={newProject.description}
            name="description"
            id="project-description"
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter project description"
          />
        </div>

        {/* File Upload */}
        <div className="max-w-md mx-auto rounded-lg overflow-hidden">
          <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="absolute flex flex-col items-center">
              <img
                alt="File Icon"
                className="mb-3"
                src="https://img.icons8.com/dusk/64/000000/file.png"
              />
              <span className="block text-gray-500 font-semibold">
                Drag & drop your files here
              </span>
              <span className="block text-gray-400 font-normal mt-1">
                or click to upload
              </span>
            </div>
            <input
              name="file"
              className="h-full w-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              type="file"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          aria-label="Cancel"
          className="px-4 py-2 rounded-2xl duration-300 bg-gray-300 hover:bg-red-500 hover:text-white hover:shadow-2xl transition-all"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          aria-label="Add Project"
          className="px-4 py-2 rounded-2xl bg-blue-400 hover:bg-blue-500 text-white hover:shadow-2xl transition-all"
          onClick={handleAddProject}
        >
          Add Project
        </button>
      </div>
    </div>
  </div>
)}

      {/* Modal for Viewing Project */}
      {isViewModalOpen && viewedProject && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{viewedProject.name}</h2>
            <p className="mb-2">
              <strong>Budget Allocated:</strong> ${viewedProject.budget}
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {viewedProject.description}
            </p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={() => handleGeneratePDF(viewedProject)}
            >
              Generate PDF
            </button>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 rounded-2xl duration-300 bg-gray-300 hover:bg-red-500 hover:text-white hover:shadow-2xl transition-all"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
