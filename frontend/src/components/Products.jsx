import React from "react";
import "../styles/Products.css";

const img =
  "https://images.unsplash.com/photo-1739477021967-e14dc3938e56?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const items = [
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
  { name: "hahaha", description: "lorumldfnaldfnlnf", price: 32 },
];

export default function Hero() {
  return (
    <section className="relative z-5 bg-white w-10/12 m-auto">
      <div className="grid grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="product border rounded-lg shadow-md">
            <img src={img} className="border rounded-lg" />
            <div className="flex justify-between items-center mx-4">
              <h1 className="my-2 font-semibold">{item.name}</h1>
              <p className="my-2 text-sm">${item.price}</p>
            </div>
            <div className="text-right">
              <button className="my-2 mx-4 font-semibold underline text-sm">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
