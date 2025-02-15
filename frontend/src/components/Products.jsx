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

export default function Products() {
  return (
    <section className="z-5 w-10/12 m-auto products-section">
      <div className="grid grid-cols-4 gap-6 products-container">
        {items.map((item, index) => (
          <div key={index} className="product border rounded-lg shadow-md">
            <div>
              <img src={img} className="border rounded-lg" />
            </div>
            <div className="flex justify-between items-center mx-4">
              <h1 className="my-2 font-semibold">{item.name}</h1>
              <p className="my-2 mb-1 text-sm">${item.price}</p>
            </div>
            <p className="mx-4 text-gray-600">{item.description}</p>

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
