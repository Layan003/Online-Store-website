import React from 'react'
import api from '../api'

export default function DeleteProduct({setShowAlert, productId, fetchProducts}) {

    const handleDeleteProduct = async () => {
        console.log('deleted', productId)
        try {
            const res = await api.delete(`manage-product/${productId}/`)
            console.log(res.data)
            fetchProducts()
            setShowAlert(false)
        }
        catch (error) {
            console.error(error)
        }
        
    }


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] md:w-[40%]">
      <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete the product?</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={() => setShowAlert(false)}
      >
        Close
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => handleDeleteProduct()}
      >
        Delete
      </button>
    </div>
  </div>
  )
}
