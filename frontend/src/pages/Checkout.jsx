import React from "react";
import "../styles/Checkout.css";
import { useState } from "react";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <section className="checkout-section flex-col w-[45%] m-auto">
      {/* address info */}
      <div className="bg-white shadow-lg h-fit p-4 border rounded-lg mb-4">
        <form className="address-form">
          <h1 className="font-semibold text-lg">Enter your Address:</h1>
          <div className="m-5 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="address"
              placeholder="Address: "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="m-3 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="city"
              placeholder="City: "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="m-3 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="zipcode" className="">
              Zip Code
            </label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="zipcode"
              placeholder="Zip code: "
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="flex justify-center"></div>
        </form>
      </div>
      {/* payment info */}
      <div className="bg-white shadow-lg h-fit p-4 border rounded-lg mb-4">
        <form className="address-form">
          <h1 className="font-semibold text-lg">Enter your Billing Info:</h1>
          <div className="m-5 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="address">Card Name</label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="card-name"
              placeholder="Card Name: "
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="m-3 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="card-number">Card Number</label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="card-number"
              placeholder="Card Number: "
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="m-3 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="exp-date" className="">
              Exp Date
            </label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="exp-date"
              placeholder="Exp Date: "
              value={cardExpDate}
              onChange={(e) => setCardExpDate(e.target.value)}
            />
          </div>

          <div className="m-3 mx-2 flex gap-2 justify-between items-center">
            <label htmlFor="cvv" className="">
              CVV
            </label>
            <input
              type="text"
              className="py-1 px-2 border border-gray-400 w-3/4"
              id="cvv"
              placeholder="CVV: "
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-4 m-auto">
        <button
          onClick={() => setSuccess(true)}
          type="submit"
          className="shadow-sm rounded-lg bg-blue-500 text-white font-semibold px-4 py-1 hover:bg-blue-700 w-[30%]"
        >
          submit
        </button>
      </div>

      {/* TODO: update the popup style */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg  p-10 flex-col justify-center items-center">
            <p className="font-semibold p-3">success!!</p>
            <button onClick={() => setSuccess(false)} className="px-4 py-2">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
