import React, { use, useEffect, useState } from "react";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import PopUp from "../components/PopUp";
import Loading from "../components/Loading";
import api from "../api";

export default function CartSummary() {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated, setItemsCount } = useAuth();
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setDelivery] = useState(8);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      setShowPopUp(true);
      return;
    }
    try {
      const res = await api.get("cart/");
      setLoading(false);
      // console.log(res.data);
      setItemsCount(res.data.items_count);
      setCartItems(res.data.items);
      // console.log(res.data.items);
      setTotalPrice(res.data.total_price);
      setCartData(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const changItemQuantity = async (productId) => {
    try {
      const res = await api.post("cart/change_qty/", { product_id: productId });
      if (res.status == 200) {
        setItemsCount(res.data.items_count);
        setCartItems(res.data.items);
        setTotalPrice(res.data.total_price);
        setCartData(res.data);
      }
    } catch (error) {
      console.error("Error fetching adding product to cart: ", error);
    }
  };

  const addCartItem = async (productId) => {
    try {
      const res = await api.post("cart/add/", { product_id: productId });
      if (res.status == 200) {
        setItemsCount(res.data.items_count);
        setCartItems(res.data.items);
        setTotalPrice(res.data.total_price);
        setCartData(res.data);
      }
    } catch (error) {
      console.error("Error fetching adding product to cart: ", error);
    }
  };

  const removeCarItem = async (productId) => {
    try {
      const res = await api.post("cart/remove/", { product_id: productId });
      if (res.status == 200) {
        setItemsCount(res.data.items_count);
        setCartItems(res.data.items);
        setTotalPrice(res.data.total_price);
        setCartData(res.data);
      }
    } catch (error) {
      console.error("Error fetching adding product to cart: ", error);
    }
  };

  const navigate = useNavigate();
  return (
    <section className="cart-section flex justify-center gap-5 ">
      <div className="w-6/12 bg-blue-200 shadow-lg bg-white rounded-lg cart-container">
        {/*  */}
        {cartItems ? (
          cartItems.map((item) => (
            <div
              className={`w-auto rounded-lg ${
                item.product.stock_quantity == 0 ? "opacity-50" : ""
              }`}
              key={item.product.id}
            >
              <div className="flex w-auto p-4 cart-item">
                <div className="w-[170px] h-[150px] align-center cart-img-container">
                  <img
                    src={`http://localhost:8000${item.product.image}`}
                    className="cart-img"
                  />
                </div>
                <div className="w-[70%] px-4 ">
                  <div className="flex-col ">
                    <div className="flex justify-between ">
                      <p className="font-semibold text-xl text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="font-semibold text-xl text-gray-700">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center mb-7">
                      <p className="text-gray-500 inline-block mr-1">
                        ${item.product.price}
                      </p>
                      <div className="vr-line mx-2"></div>
                      {item.product.stock_quantity > 0 ? (
                        <p className="text-green-500 font-semibold inline-block">
                          In Stock
                        </p>
                      ) : (
                        <p className="text-red-500 font-semibold inline-block">
                          Out of Stock
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {/* TODO: check if there is a size */}
                      {/* <div className="flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg">
                    <select className="px-3">
                      <option value={"S"}>S</option>
                      <option value={"M"}>M</option>
                      <option value={"L"}>L</option>
                    </select>
                  </div> */}
                      {item.product.stock_quantity == 0 ? (
                        <div className="flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg">
                          <div className="count-down px-2 hover:cursor-pointer">-</div>
                          <div className="px-2">{item.quantity}</div>
                          <div className="count-up px-2 hover:cursor-pointer">+</div>
                        </div>
                      ) : (
                        <div className="flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg">
                          <div
                            onClick={() => changItemQuantity(item.product.id)}
                            className="count-down px-2 hover:cursor-pointer"
                          >
                            -
                          </div>
                          <div className="px-2">{item.quantity}</div>
                          <div
                            onClick={() => addCartItem(item.product.id)}
                            className="count-up px-2 hover:cursor-pointer"
                          >
                            +
                          </div>
                        </div>
                      )}

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.2}
                          stroke="currentColor"
                          className="size-4.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        {item.product.stock_quantity == 0 ? (
                          <p className="text-sm text-gray-600 hover:cursor-pointer">Remove</p>
                        ) : (
                          <p
                            onClick={() => removeCarItem(item.product.id)}
                            className="text-sm text-gray-600 hover:cursor-pointer"
                          >
                            Remove
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hr-line"></div>
            </div>
          ))
        ) : (
          <div className="px-2 py-1 ">Cart is empty ... </div>
        )}
        {}
      </div>
      {/* order info */}
      {cartItems && isAuthenticated && (
        <div className="w-3/12 bg-white h-fit p-4 shadow-lg cart-info">
          <div className="flex justify-between mb-2 mx-2">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between mb-2 mx-2">
            <p>Discount</p>
            <p>$0.00</p>
          </div>

          <div className="flex justify-between mb-2 mx-2">
            <p>Delivery</p>
            <p>$8.00</p>
          </div>
          <div className="hr-line"></div>
          <div className="flex justify-between my-3 mx-2">
            <p className="font-semibold text-lg">Total</p>
            <p className="font-semibold text-lg">
              ${(parseFloat(totalPrice) + delivery).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between mx-2">
            <button
              onClick={() => navigate("/checkout")}
              className="shadow-md rounded-lg bg-blue-500 text-white font-semibold px-4 mr-2 hover:bg-blue-700"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="shadow-md rounded-lg bg-white text-black font-semibold px-4 border border-gray-300 hover:bg-gray-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {showPopUp && (
        <PopUp
          onClose={() => navigate("/login")}
          message={"You need to login first to view your cart"}
          button={"Login"}
        />
      )}
      {loading ? <Loading /> : <span></span>}
    </section>
  );
}
