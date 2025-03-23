import React, { useEffect, useState } from "react";
import api from "../api";

export default function UpdateProduct({setShowEditPopUp, editProductId, fetchProducts}) {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [imageChanged, setImageChanged] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProduct((prev) => ({
        ...prev,
        image: file,
      }));
    }
    setImageChanged(true)

  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("category/");
        console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
        try {
            const res = await api.get(`manage-product/${editProductId}/`)
            setProduct(res.data)
            console.log(res.data)
        }
        catch (error) {
            console.error(error)
        }
    }
    fetchProductDetails();
  }, [editProductId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('product', product);
    const data = new FormData();
    data.append('name', product.name)
    data.append('description', product.description)
    data.append('stock_quantity', product.stock_quantity)
    data.append('category', product.category)
    data.append('id', product.id)
    data.append('price', product.price)
    if (imageChanged) {
        data.append('image', product.image);        
    }
    console.log([...data])

    try {
      const res = await api.patch(`manage-product/${editProductId}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(res.data);
      if (res.status === 200) {
        console.log("updated!!");
        fetchProducts();
        setShowEditPopUp(false)
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%]">
        <div className="flex justify-end hover:cursor-pointer hover:opacity-50">
        <img src="/x.svg" width={20}  alt="x icon" onClick={() => setShowEditPopUp(false)}/>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 "
          encType="multipart/form-data"
        >
          <h2 className="font-semibold">Update Details of the product</h2>
          <div className="flex gap-2 items-center">
            {" "}
            <label htmlFor="">Name:</label>
            <input
              type="text"
              name="name"
              id=""
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              value={product.name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="">Description:</label>
            <textarea
              type="text"
              name="description"
              id=""
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              value={product.description || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="">Price:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              id=""
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              value={product.price || 0}
              onChange={handleChange}

            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="">Stock Quantity:</label>
            <input
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              type="text"
              name="stock_quantity"
              id=""
              value={product.stock_quantity || 0}
              onChange={handleChange}

            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="">Select Category:</label>
            <select

              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              name="category"
              id=""
              onChange={handleChange}
            >
              {categories.map((cat) => ( 
                <option key={cat.id} value={`${cat.id}`}>
                  {cat.name} {cat.id}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 items-center ">
            <label htmlFor="">Upload Image:</label>{" "}
            <input
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 "
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}

            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-fit text-white font-semibold px-3 py-1 shadow-md hover:bg-blue-800 hover:cursor-pointer transition-all"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
