import React from "react";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const img =
  "https://images.unsplash.com/photo-1739477021967-e14dc3938e56?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const items = [
  { name: "Shoes Nike", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
];
export default function CartSummary() {
  const navigate = useNavigate();
  return (
    <section className="cart-section flex m-auto items-center w-fit gap-5">
      <div className="shadow-lg bg-white border rounded-lg h-fit">
        {/*  */}
        <div className="flex p-4 cart-item">
          <div className="img-container">
            <img src={img} className="rounded-lg" />
          </div>
          <div className="flex justify-between w-fit p-4 grow ">
            <div className="">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl text-gray-800 ">
                  {items[0].name}
                </p>
                <p className="font-semibold text-xl text-gray-700 text-center align-center h-fit mr-1">
                  $90
                </p>
              </div>

              <div className="flex items-center mb-7">
                <p className="text-gray-500 inline-block mr-1">
                  ${items[0].price}
                </p>
                <div className="vr-line mx-2"></div>
                <p className="text-green-500 font-semibold inline-block">
                  In Stock
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="quantity-container flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg">
                  <select className="px-3">
                    <option value={"S"}>S</option>
                    <option value={"M"}>M</option>
                    <option value={"L"}>L</option>
                  </select>
                </div>

                <div className="quantity-container flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg ">
                  <div className="count-down px-2">-</div>
                  <div className="px-2 ">3</div>
                  <div className="count-up px-2">+</div>
                </div>
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
                  <p className="text-sm text-gray-600">Delete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-line"></div>
        {/*  */}

        <div className="flex p-4 ">
          <div className="img-container">
            <img src={img} className="rounded-lg" />
          </div>
          <div className="flex justify-between w-fit p-4 grow ">
            <div className="">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl text-gray-800 ">
                  {items[0].name}
                </p>
                <p className="font-semibold text-xl text-gray-700 text-center align-center h-fit mr-1">
                  $90
                </p>
              </div>

              <div className="flex items-center mb-7">
                <p className="text-gray-500 inline-block mr-1">
                  ${items[0].price}
                </p>
                <div className="vr-line mx-2"></div>
                <p className="text-green-500 font-semibold inline-block">
                  In Stock
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="quantity-container flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg">
                  <select className="px-3">
                    <option value={"S"}>S</option>
                    <option value={"M"}>M</option>
                    <option value={"L"}>L</option>
                  </select>
                </div>

                <div className="quantity-container flex items-center shadow-sm bg-gray-100 w-fit h-7 border border-gray-400 rounded-lg ">
                  <div className="count-down px-2">-</div>
                  <div className="px-2 ">3</div>
                  <div className="count-up px-2">+</div>
                </div>
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
                  <p className="text-sm text-gray-600">Delete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/* order info */}
      <div className="bg-white h-fit w-fit p-4 shadow-lg self-start cart-info">
        <div className="flex justify-between mb-2 mx-2">
          <p>Subtotal</p>
          <p>$30.99</p>
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
          <p className="font-semibold text-lg">$100.99</p>
        </div>
        <div className="flex justify-between mx-2">
          <button
            onClick={() => navigate("/checkout")}
            className="shadow-sm rounded-lg bg-blue-500 text-white font-semibold px-4 mr-2 hover:bg-blue-700"
          >
            Checkout
          </button>
          <button
            onClick={() => navigate("/")}
            className="shadow-sm rounded-lg bg-white text-black font-semibold px-4 border border-gray-300 hover:bg-gray-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}
