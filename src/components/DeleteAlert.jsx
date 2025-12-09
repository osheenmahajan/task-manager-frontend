import React from 'react'

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm text-slate-600'>{content}</p>
      <div className='flex justify-end gap-3'>
        <button
          className='px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded hover:bg-slate-200'
          onClick={() => window.history.back()} // Assuming modal handles close
        >
          Cancel
        </button>
        <button
          className='px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600'
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert
