import React from "react";
import "../styles/Products.css";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api";
import PopUp from "./PopUp";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { isAuthenticated, setItemsCount } = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(50);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(null);
  const [showPopUp, setShowPopUp] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("products/");
      setProducts(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.error("error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await api.get("category/");
        setCategory(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("error fetching Category: ", error);
      }
    };

    fetchProducts();
    fetchCategory();
    setLoading(false);
  }, []);

  const handleCategoryChange = async (categoryName) => {
    setLoading(true);
    try {
      const res = await api.get(`products/?category=${categoryName}`);
      if (res.data.length == 0) {
        setIsCategoryEmpty(true);
        setProducts([]);
      } else if (res.data.length > 0) {
        setProducts(res.data);
        setIsCategoryEmpty(false);
      }
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching products by category: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addCartItem = async (productId) => {
    if (!isAuthenticated) {
      setShowPopUp(true);
      return;
    }
    try {
      const res = await api.post("cart/add/", { product_id: productId });
      if (res.status == 200) {
        console.log(res.data);
        setItemsCount(res.data.items_count);
      }
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching adding product to cart: ", error);
    }
  };

  return (
    <section className="z-5 w-10/12 m-auto products-section ">
      <div className="flex gap-3 my-2">
        <div
          className="border border-gray-300 rounded-lg px-2 shadow-sm category-filter"
          onClick={() => {
            fetchProducts();
            setIsCategoryEmpty(false);
          }}
        >
          all
        </div>
        {category.map((category) => (
          <div
            key={category.name}
            className="border border-gray-300 rounded-lg px-2 shadow-sm category-filter"
            onClick={() => handleCategoryChange(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {isCategoryEmpty ? (
        <div>There is no products for this category...</div>
      ) : (
        <span></span>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-4 gap-6 products-container ">
          {products.map((product) => (
            <div

              key={product.id}
              className={`product border rounded-lg shadow-md flex-col h-[310px] ${product.stock_quantity == 0 ? 'opacity-50' : ''}`}
            >
              <div className="h-[50%]">
                <img
                  src={product.image}
                  className="product-img border rounded-lg"
                />
              </div>
              <div className="h-[50%] flex flex-col px-4 py-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="font-semibold">{product.name}</h1>
                  <p className=" text-sm font-semi">${product.price}</p>
                </div>
                <p className=" text-gray-600 mb-2 text-sm line-clamp-3">
                  {product.description}
                </p>

                <button
                  className="add-button mt-auto font-semibold underline text-sm block text-right"
                  onClick={() => addCartItem(product.id)}
                  disabled={`${product.stock_quantity == 0 ? true: ''}`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showPopUp && (
        <PopUp
          onClose={() => navigate('/login')}
          message={"You need to login first to add a product in cart"}
          button={"Login"}
        />
      )}
      {loading ? <Loading /> : <span></span>}
    </section>
  );
}
