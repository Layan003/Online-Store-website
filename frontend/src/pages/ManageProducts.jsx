import React, { act, useEffect, useState } from "react";
import api from "../api";
import Loading from "../components/Loading";
import "../styles/Dashboard.css";
import AddNewProduct from "../components/AddNewProduct";
import PopUp from "../components/PopUp";
import DeleteProduct from "../components/DeleteProduct";
import UpdateProduct from "../components/UpdateProduct";

export default function ManageProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [stock, setStock] = useState(50);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [productId, setProductId] = useState(null)
  const [editProductId, setEditProductId] = useState(null)
  const [showEditPopUp, setShowEditPopUp]= useState(false)

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("manage-products/");
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductSearch = async () => {
    try {
      const res = await api.get(`manage-products/?search=${search}`);
      setProducts(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductByStock = async () => {
    try {
      const res = await api.get(`manage-products/?stock=${stock}`);
      setProducts(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  const handleEditProduct = async (id) => {};

  return (
    <div className="w-[100%] md:w-[80%] mx-auto">
      <div className="my-4 border border-gray-200 flex items-center mx-auto gap-3 p-1 rounded-lg shadow-md w-fit bg-white ">
        <input
          type="text"
          className="focus:outline-none p-1 w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ border: "none" }}
          placeholder="Search product by name or description..."
        />
        <img
          src="/search.svg"
          alt="search icon"
          className="hover:opacity-50 hover:cursor-pointer"
          onClick={() => fetchProductSearch()}
        />
      </div>

      <div className="shadow-md rounded-lg w-fit p-2 flex gap-2 items-center border border-gray-200 mx-auto bg-white my-4">
        <p className="">Stock:</p>
        <div className="flex items-center gap-1">
          <span>0</span>
          <input
            type="range"
            min="0"
            max="1000"
            onChange={(e) => {
              setStock(e.target.value);
              fetchProductByStock();
            }}
            value={stock}
          />
          <span>{stock}</span>
        </div>
      </div>

      <div
        onClick={() => setShowAddProduct(true)}
        className="shadow-md rounded-lg w-fit p-2 flex gap-2 items-center border border-gray-200 mx-auto bg-white my-4 hover:cursor-pointer hover:bg-gray-300 transition-all"
      >
        <img src="/plus.svg" alt="plus icon" width={20} />
        <p>Add new product</p>
      </div>

      <div className="bg-white rounded-lg shadow-md px-1 md:px-3 py-2 orders-container2">
        <div className="flex items-center justify-between my-2 w-[100%]">
          <h2 className="text-gray-500 w-1/15">ID</h2>
          <h2 className="text-gray-500 w-2/15">Image</h2>
          <h2 className="text-gray-500 w-3/15">Name</h2>
          <h2 className="text-gray-500 w-2/15">Price</h2>
          <h2 className="text-gray-500 w-3/15">Category</h2>
          <h2 className="text-gray-500 w-1/15">Stock</h2>
          <h2 className="w-1/15"></h2>
        </div>
        <div className="bg-gray-200 h-[1px]"></div>
        {products.length === 0 ? (
          <p className="p-2">There is no products available...</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white flex items-center justify-between my-2 px-1 md:px-3  py-2"
            >
              <h2 className="w-1/15">{product.id}</h2>

              <div className="w-1/7">
                <img
                  src={product.image}
                  alt="product image"
                  className="w-[40px] h-[30px] md:w-[80px] md:h-[60px] object-cover"
                />
              </div>
              <h2 className="w-3/15">{product.name}</h2>
              <h2 className="w-2/15">{product.price}</h2>
              <h2 className="w-3/15">{product.category_name}</h2>
              <h2 className="w-1/15">{product.stock_quantity}</h2>
              <div className="w-1/15 flex justify-end gap-1 md:gap-8">
                <img
                  onClick={() => {setShowAlert(true)
                    setProductId(product.id)}}
                  className="hover:opacity-40 hover:cursor-pointer w-[10px] md:w-[18px]"
                  src="/trash.svg"
                  alt="trash icon"
                />
                <img
                  onClick={() => {setShowEditPopUp(true)
                    setEditProductId(product.id)}}
                  className="hover:opacity-40 hover:cursor-pointer w-[10px] md:w-[18px]"
                  src="/pencil.svg"
                  alt="pencil icon"
                />
              </div>
            </div>
          ))
        )}
      </div>
      {loading && <Loading />}
      {showAddProduct && (
        <AddNewProduct
          setShowAddProduct={setShowAddProduct}
          fetchProducts={fetchProducts}
        />
      )}
      {showAlert&&(<DeleteProduct setShowAlert={setShowAlert} productId={productId} fetchProducts={fetchProducts}/>)}
      {showEditPopUp&&(<UpdateProduct setShowEditPopUp={setShowEditPopUp} editProductId={editProductId} fetchProducts={fetchProducts}/>)}
    </div>
  );
}
