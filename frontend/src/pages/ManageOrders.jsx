import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useAuth } from "../Context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../components/Loading";
import PopUp from "../components/PopUp";

export default function ManageOrders() {
  const { isAdmin, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [unCompleted, setUnCompleted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [unShipped, setUnShipped] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("orders/");
      if (res.status == 200) {
        setOrders(res.data);
        console.log(res.data);
      }
      console.log(res.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const changeShippedStatus = async (id) => {
    try {
      const res = await api.get(`order/${id}/shipped-status/`);
      fetchOrders();
    } catch (error) {
      if (error.response && error.status === 400) {
        if (error.response.data) {
          setShowPopUp(true);
          console.log(error.response.data);
        }
      }
    }
  };


  useEffect(() => {
    let filters = [];

    if (shipped) filters.push("shipped=true");
    if (unShipped) filters.push("unShipped=true");
    if (completed) filters.push("completed=true");
    if (unCompleted) filters.push("unCompleted=true");

    let query = filters.length > 0 ? filters.join("&") : "";

    console.log(query);
    const fetchByFilter = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/orders/?${query}`);
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchByFilter();
  }, [shipped, unCompleted, completed, unShipped]);

  return (
    <section className="dashboard-section mx-4 my-2">
      <div className="flex gap-3 my-2">
        <div
          className={`rounded-lg px-2 shadow-md hover:cursor-pointer transition-all hover:bg-gray-100 ${
            shipped ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setShipped((prev) => !prev)}
        >
          Shipped
        </div>
        <div
          className={`rounded-lg px-2 shadow-md hover:cursor-pointer transition-all hover:bg-gray-100 ${
            unShipped ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setUnShipped((prev) => !prev)}
        >
          Un Shipped
        </div>
        <div
          className={`rounded-lg px-2 shadow-md hover:cursor-pointer transition-all hover:bg-gray-100 ${
            completed ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setCompleted((prev) => !prev)}
        >
          Completed
        </div>
        <div
          className={`rounded-lg px-2 shadow-md hover:cursor-pointer transition-all hover:bg-gray-100 ${
            unCompleted ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setUnCompleted((prev) => !prev)}
        >
          Un Completed
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md px-3 py-2 orders-container">
        <>
          <div className="flex justify-between my-2  order-container">
            <p className="w-1/12 text-gray-500">Order</p>
            <p className="w-2/12 text-gray-500">Customer</p>
            <p className="w-2/12 text-gray-500">Status</p>
            <p className="w-2/12 text-gray-500">Total price</p>
            <p className="w-2/12 text-gray-500">Date Ordered</p>
            <p className="w-2/12 text-gray-500">Shipped</p>
            <p className="w-2/12 text-gray-500">Date Shipped</p>
          </div>
          <div className="hr-line2"></div>
        </>

        {orders.length !== 0 &&
          orders.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between my-2 order-container">
                <p className="w-1/12 ">{item.id}</p>
                <p className="w-2/12 ">{item.username}</p>
                <p className="w-2/12 ">
                  {item.completed ? "Completed" : "Uncompleted"}
                </p>
                <p className="w-2/12 ">${item.total_price}</p>
                <p className="w-2/12 ">
                  {item.completed
                    ? format(new Date(item.date_ordered), "dd/MM/yyyy")
                    : "-"}
                </p>
                <p className="w-2/12 ">
                  {item.shipped ? (
                    <div>
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => changeShippedStatus(item.id)}
                        className="mr-1"
                      />
                      Mark Shipped
                    </div>
                  ) : (
                    <div>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => changeShippedStatus(item.id)}
                        className="mr-1"
                      />
                      Mark Shipped
                    </div>
                  )}
                </p>

                <p className="w-2/12 ">
                  {item.shipped
                    ? format(new Date(item.date_shipped), "dd/MM/yyyy")
                    : "-"}
                </p>
              </div>
            </div>
          ))}
      </div>
      {loading && <Loading />}
      {showPopUp && (
        <PopUp
          onClose={() => setShowPopUp(false)}
          message={"You can't mark an order as shipped unless it is completed"}
          button={"close"}
        />
      )}
    </section>
  );
}
