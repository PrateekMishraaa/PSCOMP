import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCandidate = ({ onClose }) => {
  const [formData, setFormData] = useState({
    CandidateName: "",
    EmailAddress: "",
    PhoneNumber: "",
    Position: "",
    Experience: "",
   
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleC = async (e) => {
    e.preventDefault();

    const { CandidateName, EmailAddress, PhoneNumber, Position, Experience } = formData;

    if (!CandidateName || !EmailAddress || !PhoneNumber || !Position || !Experience ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://psquarebackend-1.onrender.com/api/new-candidate", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("Congratulations! New candidate created");
      if (onClose) onClose(); // auto-close after success
    } catch (error) {
      console.error(error);
      toast.error("Can't create candidate right now");
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center bg-purple-700 text-white px-6 py-3 rounded-t-md">
          <h2 className="text-lg font-semibold">Add New Candidate</h2>
          {/* <button onClick={onClose} className="text-xl font-bold hover:text-gray-200">
            &times;
          </button> */}
        </div>

        <form onSubmit={handleC} className="bg-white px-6 py-6 rounded-b-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="CandidateName"
              value={formData.CandidateName}
              onChange={handleInputChange}
              placeholder="Full Name*"
              className="border border-purple-400 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              name="EmailAddress"
              value={formData.EmailAddress}
              onChange={handleInputChange}
              placeholder="Email Address*"
              className="border border-purple-400 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number*"
              className="border border-purple-400 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="Position"
              value={formData.Position}
              onChange={handleInputChange}
              placeholder="Position*"
              className="border border-purple-400 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              name="Experience"
              value={formData.Experience}
              onChange={handleInputChange}
              placeholder="Experience*"
              className="border border-purple-400 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* <input
              type="string"
              name="Department"
              // value={formData.Department}
              onChange={handleInputChange}
              placeholder="Department*"
              className="border border-purple-400 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            /> */}
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Save
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddCandidate;
