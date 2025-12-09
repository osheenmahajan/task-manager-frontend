import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import UserCard from '../../components/Cards/UserCard'
import { LuDownload } from 'react-icons/lu'
import toast from 'react-hot-toast'

const ManagerUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data && response.data.users) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
    });


    //create url for blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }

  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu="Manage Users">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>
            <button
              className='flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 rounded px-3 py-1.5 border border-blue-100 hover:border-blue-300 cursor-pointer'
              onClick={handleDownloadReport}
            >
              <LuDownload className='text-base' /> Download Report
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {allUsers?.map((user, index) => (
            <UserCard
              key={user._id}
              userInfo={user}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManagerUsers
