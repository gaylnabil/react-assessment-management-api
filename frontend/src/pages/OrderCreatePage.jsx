import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import FormOrder from "../components/orders/FormOrder";

function OrderCreatePage() {
  const [ isEditing, setIsEditing ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsEditing(id !== undefined);
  }, [ id, isEditing ]);
  // console.log("🚀 ~ file: BeersCreatePage.jsx:27 ~ BeersCreatePage ~ beer:", beer);
  // console.log("🚀 ~ file: BeersCreatePage.jsx:28 ~ BeersCreatePage ~ Id:", id);

  return (
    <div>
      <h1>{id}</h1>
      <FormOrder isEditing={isEditing} beerId={id} />
    </div>
  );
}
export default OrderCreatePage;
