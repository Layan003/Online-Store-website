import React, { useEffect, useState } from 'react'
import api from '../api'
import Loading from '../components/Loading'
import { format } from 'date-fns'

export default function Orders() {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get('user-order/')
                console.log(res.data)
                setOrders(res.data);
            }
            catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchOrder();
    }, [])
  return (
    <div className="mt-4 w-[95%] md:w-[80%] mx-auto">
      {orders.length == 0 ? (
        <p>You have no active orders</p>
      ) : (
        orders
          .filter((order) => order.completed)
          .map((order) => {
            return (
              <div key={order.id} className='bg-white rounded-lg my-3 border border-gray-200 shadow-md p-3 flex flex-col gap-1 lg:w-[50%] lg:mx-auto '>
                <h2>Order ID:{order.id}</h2>
                <div className='bg-gray-300 h-[1px] '></div>
                <p><span className='font-semibold'>Total items:</span> {order.items_count}</p>
                <p><span className='font-semibold'>Total Price:</span> ${order.total_price}</p>
                {order.shipped ? (<div> <span className='font-semibold'>Shipped on:</span> {format(new Date(order.date_shipped), 'dd/MM/yyy')}</div>) : (<p>Not shipped yet</p>)}
                <p><span className='font-semibold'>Ordered on:</span> {format(new Date(order.date_ordered), 'dd/MM/yyy')}</p>

              </div>
            );
          })
      )}

      {loading && <Loading />}
    </div>
  );
}
