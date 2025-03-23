import React, { useEffect, useState } from "react";
import api from "../api";

export default function AddNewProduct({setShowAddProduct,fetchProducts}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    category: 1,
  });
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append('name', product.name)
    // data.append('description', product.description)
    // data.append('price', product.price)
    // data.append('category', product.category)
    // data.append('stock_quantity', product.stock_quantity)
    // if(product.image) {
    //     data.append('image', product.image)
    // }
    // console.log([...data.entries()])
    console.log(product);
    try {
      const res = await api.post("manage-products/", product, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      if (res.status === 201) {
        console.log("created!!");
        fetchProducts();
        setShowAddProduct(false)
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[60%]">
        <div className="flex justify-end hover:cursor-pointer hover:opacity-50">
        <img src="/x.svg" width={20}  alt="x icon" onClick={() => setShowAddProduct(false)}/>

        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 "
          encType="multipart/form-data"
        >
          <h2 className="font-semibold">Add Details of the product</h2>
          <div className="flex gap-2 items-center">
            {" "}
            <label htmlFor="">Name:</label>
            <input
              type="text"
              name="name"
              id=""
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              value={product.name}
              onChange={(e) => handleChange(e)}
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
              value={product.description}
              onChange={(e) => handleChange(e)}
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
              value={product.price}
              onChange={(e) => handleChange(e)}
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
              value={product.stock_quantity}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="">Select Category:</label>
            <select
              style={{ border: "1px solid lightgray" }}
              className="rounded-lg shadow-md p-1 flex-grow"
              name=""
              id=""
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              {categories.map((cat) => ( 
                <option key={cat.id} value={`${cat.id}`}  onChange={(e) =>
                    setProduct((prev) => ({ ...prev, category: e.target.value }))
                  }>
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
              accept="image/*"
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, image: e.target.files[0] }))
              }
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
