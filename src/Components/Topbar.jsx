import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import AddCandidate from '../Pages/AddCandidate.jsx';
import {useNavigate} from "react-router-dom"

const Topbar = ({ onFilterChange }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // pass filters to parent
  };

  const handleNavigate=()=>{
    navigate('/profile')
  }
  return (
    <>
      <section className="w-full md:w-[80%] ml-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-4 bg-white shadow-md">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              name="status"
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              name="position"
              placeholder="Position"
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
            <input
              name="experience"
              placeholder="Experience"
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Add Candidate & Icons */}
          <div className="flex gap-4 items-center self-end md:self-auto">
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Candidate
            </button>
            <FaBell className="text-gray-600" />
            <FaUserCircle  className="text-gray-600 text-xl" />
          </div>
        </div>

        {/* Add Candidate Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 text-xl hover:text-black"
              >
                &times;
              </button>
              <AddCandidate onClose={() => setShowModal(false)} />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Topbar;
