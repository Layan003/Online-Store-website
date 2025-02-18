import React from 'react'

export default function PopUp({message, onClose, button}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          {button}
        </button>
      </div>
    </div>
  );
}
