import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import FormProduct from "../components/products/FormProduct";
import ProductService from './../services/ProductService';
function ProductsCreatePage() {
  const productService = new ProductService();
  const [ isEditing, setIsEditing ] = useState(false);
  const { id } = useParams();

  // Sets the isEditing flag to true if there is an ID associated with this Product
  useEffect(() => {
    setIsEditing(id !== undefined);
  }, [ id, isEditing ])
  // console.log("🚀 ~ file: ProductsCreatePage.jsx:27 ~ ProductsCreatePage ~ product:", product);
  // console.log("🚀 ~ file: ProductsCreatePage.jsx:28 ~ ProductsCreatePage ~ Id:", id);

  return (
    <div>
      <h1>{id}</h1>
      <FormProduct isEditing={isEditing} productId={id} productService={productService} />
    </div>
  );
}

export default ProductsCreatePage;
