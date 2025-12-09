import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from '../../../utils/apiPaths'
import Modal from '../../Modal'
import { LuUsers } from 'react-icons/lu'
import AvatarGroup from '../../AvatarGroup'

const SelectUsers = ({ selectedUsers, onSelect  }) => {
  const [allUsers, setAllUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempSelectedUsers, setTempSelectedUsers] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
      if(response.data?.users?.length > 0){
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAssign = () => {
    onSelect(tempSelectedUsers);
    setIsModalOpen(false)
  }

  const selectedUsersAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers()
  }, [])

  // keep local temp selection synced with prop
  useEffect(() => {
    if(selectedUsers.length === 0){
      setTempSelectedUsers([]);
    }
    return () => {}
  }, [selectedUsers])


  return (
    <div className='space-y-4 mt-2'>
      {selectedUsersAvatars.length > 0 ? (
        <AvatarGroup avatars={selectedUsersAvatars} />
      ) : (
        <button
          className='card-btn'
          onClick={() => {
            setTempSelectedUsers(selectedUsers);
            setIsModalOpen(true);
          }}
        >
          <LuUsers className='text-sm' /> Add Members
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4">
          <div className="h-[60vh] overflow-y-auto">
            {allUsers.map((user) => (
              <div
                key={user._id}
                className='flex items-center gap-4 p-3 border-b border-gray-200'
              >
                <img
                   src={user.profileImageUrl || null}
                   alt={user.name}
                   className='w-10 h-10 rounded-full'
                />
                <div className='flex-1'>
                  <p className='font-medium text-gray-800 dark:text-white'>
                    {user.name}
                  </p>
                  <p className='text-[13px] text-gray-900 font-bold'>{user.username || 'No username'}</p>
                  <p className='text-[13px] text-gray-900'>{user.email}</p>
                </div>
                <input
                   type='checkbox'
                   checked={tempSelectedUsers.includes(user._id)}
                   onChange={() => toggleUserSelection(user._id)}
                   className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none'
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAssign}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Assign
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SelectUsers
