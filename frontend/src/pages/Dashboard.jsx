import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useAuth } from "../Context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function Dashboard() {
  const { isAdmin, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    'shipped': null, 
    'unshipped': null,
    'completed': null,
    'uncompleted': null
  }) 

  const fetchOrders = async () => {
    try {
      const res = await api.get("orders/");
      if (res.status == 200) {
        setOrders(res.data);
        console.log(res.data);
      }
      console.log(res.status);
    } catch (error) {
      console.error(error);
    }
  };

  const changeShippedStatus = async (id) => {
    try {
      const res = await api.get(`order/${id}/shipped-status/`);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchOrders();
  }, []);

//   const fetchFilters = async () => {
//     // ?category=${categoryName}
//     let filterParams = [];
//     Object.entries(filters).forEach(([key, value]) => {
//         if (value) {
//             filterParams.push(key)
//         }
//       });
//       let filterQuery = filterParams.length > 0 ? filterParams.join('&') : '';
//     //   try {
//     //     const res = await api.get(`orders/?filter=${filterQuery}`);
//     //     console.log(res.data);

//     //   }
//     //   catch (error) {
//     //     console.log(error)
//     //   }
//       console.log(filterParams)

//   }

//   const selectFilter = async (filter) => {
//     setFilters(prevs => {
//         const updatedFilters = {... prevs}
//         updatedFilters[filter] = prevs[filter] === true ? null : true; 
//         return updatedFilters
//     })
//     fetchFilters();
//   }

  return (
    <section className="dashboard-section mx-4 my-2">
      {/* filters */}

      {/* <div className="flex gap-3 my-2">
        {Object.keys(filters).map((filter) => (
          <div
          key={filter}
            className="border bg-white border-none rounded-lg px-2 shadow-md"
            onClick={() => selectFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div> */}

      {/* <div className="flex gap-3 my-2">
        <div className="border bg-white border-none rounded-lg px-2 shadow-md">
          Completed
        </div>
        <div className="border bg-white border-none rounded-lg px-2 shadow-md">
          Uncompleted
        </div>
        <div className="border bg-white border-none rounded-lg px-2 shadow-md">
          Shipped
        </div>
        <div className="border bg-white border-none rounded-lg px-2 shadow-md">
          Unshipped
        </div>
      </div> */}

      {/* dashboard container */}
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

        {orders.length != 0 &&
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
              {/* <div className="hr-line2"></div> */}
            </div>
          ))}
      </div>
    </section>
  );
}
