import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormOrder from "../components/orders/FormOrder";
import OrderService from "./../services/OrderService";
function OrderCreatePage() {
  const [ isEditing, setIsEditing ] = useState(false);
  const { id } = useParams();
  const orderService = new OrderService();
  useEffect(() => {
    setIsEditing(id !== undefined);
  }, [ id, isEditing ]);
  // console.log("🚀 ~ file: ProductsCreatePage.jsx:27 ~ ProductsCreatePage ~ product:", product);
  // console.log("🚀 ~ file: ProductsCreatePage.jsx:28 ~ ProductsCreatePage ~ Id:", id);

  return (
    <div>
      <h1>{id}</h1>
      <FormOrder
        isEditing={isEditing}
        productId={id}
        orderService={orderService}
      />
    </div>
  );
}
export default OrderCreatePage;
