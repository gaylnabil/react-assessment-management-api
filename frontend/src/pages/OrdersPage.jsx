import React from 'react'
import OrderList from '../components/orders/OrderList'
import { useNavigate } from 'react-router-dom'
import OrderService from './../services/OrderService';


function OrdersPage() {
  const navigate = useNavigate();
  const orderService = new OrderService();
  return (

    <div className="container">
      <h1 className="text-center py-2">Order List</h1>
      <div className="row my-4">
        <div className="col px-2 text-center">
          <div className="row">
            <div className="py-1 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary px-5"
                onClick={() => { navigate("/orders/new", { state: { isEditing: false } }) }}
              >
                New Order
              </button>
            </div>

          </div>
        </div>

      </div>
      <OrderList orderService={orderService} />
    </div>
  )
}

export default OrdersPage
