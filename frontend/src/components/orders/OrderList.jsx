import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function OrderList(props) {

  const [ orderList, setOrderList ] = useState([]);

  // Gets the order list from the service and stores it in the config.
  const getOrders = async () => {
    const data = await props.orderService.getOrdersWithWholesalersAndProducts();
    console.log("getOrderList:", data);
    setOrderList(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th className="w-25" scope="col">
              Client Name
            </th>
            <th scope="col">Product</th>
            <th scope="col">Wholesaler</th>
            <th scope="col">Quantity </th>
            <th scope="col">Discount</th>
            <th scope="col">Price</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            return (
              <tr key={order.id}>
                <th scope="row">{order.clientName}</th>
                <th scope="row">{order.product.name}</th>
                <td>{order.wholesaler.name}</td>
                <th scope="row">{order.quantity}</th>
                <td>
                  {(order.discount / 100).toLocaleString("en-US", {
                    style: "percent",
                  })}
                </td>
                <td>
                  {order.totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
