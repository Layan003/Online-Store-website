import React from "react";
import "../styles/Checkout.css";
import { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";
import Loading from "../components/Loading";


export default function Checkout() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpDate, setCardExpDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState([]);
  const [addressSuccess, setAddressSuccess] = useState(false);
const [billingSuccess, setBillingSuccess] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true)
      try {
        const res = await api.get("address/");
        if (res.status == 200) {
          console.log(res.data);
          setAddress(res.data.address);
          setCity(res.data.city);
          setZipcode(res.data.zipcode);
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false)
      }
    };

    if (isAuthenticated) {
      fetchAddress();
      setErrors([])
    }
  }, [isAuthenticated]);

  const handleAddressChange = async () => {

    let data = {};
    data = {
      address: address,
      city: city,
      zipcode: zipcode,
    };

    try {
      const res = await api.post("address/", data);
      console.log(res.data);
      if (res.status == 201) {
        // setSuccess(true);
        console.log(res.data);
        setAddressSuccess(true)
        return
      }
      setErrors(prevErrors => {
        if (!prevErrors.includes("Invalid Address info. Please try again.")) {
          return [...prevErrors, "Invalid Address info. Please try again."];
        }
        return prevErrors;
      });
    } catch (error) {
      console.error(error);
      setErrors(prevErrors => {
        if (!prevErrors.includes("Invalid Address info. Please try again.")) {
          return [...prevErrors, "Invalid Address info. Please try again."];
        }
        return prevErrors;
      });
    }
  };

  const handleBillingInfo = async () => {
    // setLoading(true)
    const data = {
      card_name: cardName,
      card_number: cardNumber,
      expiry_date: cardExpDate,
      cvv: cardCvv
    };
    if (cardCvv.length > 3 || cardCvv.length < 3) {
      setErrors(prevErrors => [...prevErrors, "Card CVV must be 3 digits ."]);
    }
    try {
      const res = await api.post("billing_info/", data);
      console.log(res.data);
      if (res.status == 200) {
        // setSuccess(true);
      console.log(res.data);
      setBillingSuccess(true)
      setLoading(false)
      return

      }
      setErrors(prevErrors => {
        if (!prevErrors.includes("Invalid billing info. Please try again.")) {
          return [...prevErrors, "Invalid billing info. Please try again."];
        }
        return prevErrors;
      });

      
    } catch (error) {

      console.error(error);
      setErrors(prevErrors => {
        if (!prevErrors.includes("Invalid billing info. Please try again.")) {
          return [...prevErrors, "Invalid billing info. Please try again."];
        }
        return prevErrors;
      });

    }
  };

  const submitData = async (e) => {
    setLoading(true)
    e.preventDefault();
    setErrors([])
    setAddressSuccess(false);
    setBillingSuccess(false);

    await handleAddressChange();
    await handleBillingInfo()
    if (addressSuccess && billingSuccess) {
      setLoading(false)
      placeOrder();
    } 
    setLoading(false)
  }

  const placeOrder = async () => {
      try {
        const res = await api.get('place_order/')
        if (res.status ==200){
          setOrderSuccess(true)
        }
        console.log(res.data)

      } catch (error) {
        console.error(error)
        
      }
  }

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
      {errors &&
        errors.map((err, i) => (
          <div key={i} className="text-center text-red-500 font-semibold my-1">
            {err}
          </div>
        ))}

      <div className="flex justify-center mt-4 m-auto">
        <button
          onClick={(e) => submitData(e)}
          type="submit"
          className="shadow-sm rounded-lg bg-blue-500 text-white font-semibold px-4 py-1 hover:bg-blue-700 w-[30%]"
        >
          submit
        </button>
        <div></div>
      </div>
      {
        orderSuccess == true && (  <PopUp
          onClose={() => navigate("/")}
          message="Order Placed !"
          button="Close"
        />)
      }
      {
        orderSuccess == false && (  <PopUp
          onClose={() => navigate("/")}
          message="Order failed to place. Make sure you have items in cart.."
          button="Close"
        />)
      }

  
      {loading ? <Loading /> : <span></span>}
    </section>
  );
}
