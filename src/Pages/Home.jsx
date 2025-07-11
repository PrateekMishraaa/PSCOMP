import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Topbar from '../Components/Topbar';
import AddCandidate from '../Pages/AddCandidate';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEdit, FiTrash2, FiMenu, FiX } from 'react-icons/fi';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import {useNavigate} from "react-router-dom"
const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleNavigate=()=>{
    navigate('/profile')
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        'https://psquarebackend-1.onrender.com/api/candidates'
      );
      console.log(data)
      setData(data.allcandidates);   // ← now this key exists
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = data.filter((item) => {
    return (
      (!filters.status || item.Status.toLowerCase().includes(filters.status.toLowerCase())) &&
      (!filters.name || item.CandidateName.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email || item.EmailAddress.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone || item.PhoneNumber.includes(filters.phone)) &&
      (!filters.position || item.Position.toLowerCase().includes(filters.position.toLowerCase())) &&
      (!filters.experience || item.Experience.toString().includes(filters.experience))
    );
  });

  const handleStatusChange = async (id, currentStatus) => {
    const next =
      currentStatus === 'pending'
        ? 'Selected'
        : currentStatus === 'Selected'
        ? 'Rejected'
        : 'pending';

    try {
      await axios.put(`https://psquarebackend-1.onrender.com/api/status/${id}`, { Status: next });
      setData((prev) => prev.map((c) => (c._id === id ? { ...c, Status: next } : c)));
      toast.success(`Status updated to ${next}`);
    } catch (err) {
      console.error(err);
      toast.error('Could not update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      await axios.delete(`https://psquarebackend-1.onrender.com/api/delete-candidate/${id}`);
      setData((prev) => prev.filter((c) => c._id !== id));
      toast.success('Candidate deleted');
    } catch (err) {
      console.error(err);
      toast.error('Could not delete candidate');
    }
  };

  const openEditModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCandidate(null);
  };

  const handleEditSuccess = (updated) => {
    setData((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    closeEditModal();
    toast.success('Candidate updated');
  };

  const handleAddSuccess = (newCandidate) => {
    setData((prev) => [...prev, newCandidate]);
    setShowModal(false);
    toast.success('Candidate added successfully');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Filter Bar */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 flex-1">
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <input
                  name="name"
                  placeholder="Name"
                  value={filters.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={filters.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={filters.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  name="position"
                  placeholder="Position"
                  value={filters.position}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  name="experience"
                  placeholder="Experience"
                  value={filters.experience}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Add Candidate & Icons */}
              <div className="flex items-center gap-4 self-end lg:self-auto">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Add Candidate
                </button>
                <div className="flex items-center gap-3">
                  <FaBell className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                  <FaUserCircle onClick={()=>handleNavigate()} className="text-gray-500 hover:text-gray-700 cursor-pointer text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="px-4 py-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Candidates</h2>
          </div>

          {/* Content Area */}
          <div className="flex-1 px-4 pb-4 sm:px-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading candidates...</p>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="block md:hidden">
                    {filteredData.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-gray-500">No candidates matched your filters.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {filteredData.map((c, i) => (
                          <div key={c._id} className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-500">#{String(i + 1).padStart(2, '0')}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openEditModal(c)}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                  title="Edit"
                                >
                                  <FiEdit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(c._id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="font-medium text-gray-900 text-base">{c.CandidateName}</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p className="break-all">{c.EmailAddress}</p>
                                <p>{c.PhoneNumber}</p>
                                <p>{c.Position}</p>
                                <p>{c.Experience} years experience</p>
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <span
                                onClick={() => handleStatusChange(c._id, c.Status)}
                                className={`inline-block cursor-pointer px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  c.Status === 'pending'
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    : c.Status === 'Selected'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                              >
                                {c.Status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sr No.
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Experience
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((c, i) => (
                          <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {String(i + 1).padStart(2, '0')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {c.CandidateName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {c.EmailAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {c.PhoneNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {c.Position}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                onClick={() => handleStatusChange(c._id, c.Status)}
                                className={`inline-flex cursor-pointer px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                  c.Status === 'pending'
                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    : c.Status === 'Selected'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                              >
                                {c.Status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {c.Experience}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openEditModal(c)}
                                  className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <FiEdit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(c._id)}
                                  className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {filteredData.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No candidates matched your filters.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Candidate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <FiX size={24} />
            </button>
            <AddCandidate 
              onClose={() => setShowModal(false)} 
              onSuccess={handleAddSuccess}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <AddCandidate
              mode="edit"
              initialData={selectedCandidate}
              onClose={closeEditModal}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}

      {/* Toast Container with responsive positioning */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16 md:mt-0"
      />
    </>
  );
};

export default Home;