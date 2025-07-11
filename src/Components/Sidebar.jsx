import React from 'react';
import { FaUserFriends, FaUserTie, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout=()=>{
      localStorage.removeItem("token",)
      toast.success("Logging Out")
      setTimeout(() => {
          navigate('/login')
      }, 1000);
  }
  return (
    <>
    <div className="bg-gray-600 text-white w-64 h-screen p-6 flex flex-col justify-between min-h-[100%]">
      <div>
        <h1 className="text-xl font-bold mb-8">LOGO</h1>
        <ul className="space-y-6 text-sm">
          <li className="text-purple-500 font-semibold">Recruitment</li>
          <li className="pl-4 text-white"><a href="/">➤ Candidates</a></li>
          <li className="mt-4 text-purple-500 font-semibold">Organization</li>
          <li className="pl-4"><a href="">➤ Employees</a></li>
          <li className="pl-4">➤ Attendance</li>
          <li className="pl-4">➤ Leaves</li>
        </ul>
      </div>
      <div>
        <button className="flex items-center gap-2 text-sm cursor-pointer" onClick={()=>handleLogout()}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Sidebar;
