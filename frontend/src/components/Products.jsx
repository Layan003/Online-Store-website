import React from "react";
import "../styles/Products.css";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api";

export default function Products() {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(50);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await api.get("products/");
        setProducts(res.data);
      } catch (error) {
        console.error("error fetching products: ", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const res = await api.get("category/");
        setCategory(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("error fetching Category: ", error);
      }
    };

    fetchMenuItems();
    fetchCategory();
  }, []);

  const handleCategoryChange = async (categoryName) => {
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
    }
  };

  return (
    <section className="z-5 w-10/12 m-auto products-section ">
      {isAuthenticated === null ? (
        <li>Loading...</li>
      ) : isAuthenticated ? (
        <li>Welcome, User</li>
      ) : (
        <li>Please log in</li>
      )}
      <div className="flex gap-3 my-2">
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
        <div className="grid grid-cols-4 gap-6 products-container">
          {products.map((product) => (
            <div
              key={product.id}
              className="product border rounded-lg shadow-md flex-col h-[310px]"
            >
              <div className="h-[50%]">
                <img src={product.image} className="border rounded-lg" />
              </div>
              <div className="h-[50%] flex flex-col px-4 py-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="font-semibold">{product.name}</h1>
                  <p className=" text-sm">${product.price}</p>
                </div>
                <p className=" text-gray-600 mb-2 text-sm line-clamp-3">
                  {product.description}
                </p>

                <button className="add-button mt-auto font-semibold underline text-sm block text-right">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
