import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        toast.error('Session expired. Please log in again.');
      }
    }
  }, []);

  return (
    <>
      {/* 1️⃣  Main layout: sidebar + content */}
      <div className="flex min-h-screen">
        <Sidebar />

        {/* 2️⃣  Scrollable content area */}
        <main className="flex-1 bg-gray-100 overflow-x-auto p-4 sm:p-6 md:p-8">
          {/* 3️⃣  Profile card */}
          <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-white shadow-md rounded-lg p-5 sm:p-8">
            <h2 className="text-center font-bold text-2xl sm:text-3xl mb-6 text-gray-800">
              User Profile
            </h2>

            {user ? (
              <div className="space-y-5">
                {/* Full Name */}
                <InfoRow label="Full Name" value={user.fullName} />
                {/* Email */}
                <InfoRow label="Email" value={user.email} breakAll />
                {/* Role / Department / Phone (render only if present) */}
                {user.role && <InfoRow label="Role" value={user.role} />}
                {user.mobile && <InfoRow label="Mobile" value={user.mobile} />}
                {user.department && (
                  <InfoRow label="Department" value={user.department} />
                )}
                {user.phone && <InfoRow label="Phone" value={user.phone} />}
                {user.createdAt && (
                  <InfoRow
                    label="Member Since"
                    value={new Date(user.createdAt).toLocaleDateString()}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12">
                <span className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-b-transparent" />
                <p className="mt-4 text-gray-600">Loading user data…</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 4️⃣  Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  );
};

/*----------------------------------------------------------
  Tiny helper component keeps markup clean
----------------------------------------------------------*/
const InfoRow = ({ label, value, breakAll = false }) => (
  <div className="flex flex-col sm:flex-row sm:items-center border-b last:border-b-0 pb-3 last:pb-0">
    <span className="sm:w-40 font-semibold text-gray-700">{label}:</span>
    <span
      className={`mt-1 sm:mt-0 text-gray-600 ${
        breakAll ? 'break-all' : 'whitespace-normal'
      }`}
    >
      {value}
    </span>
  </div>
);

export default Profile;
