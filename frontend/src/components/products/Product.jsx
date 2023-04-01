import React from 'react';

import { useNavigate } from "react-router-dom";
import Modal from '../Modal';
import { truncate } from './../../utils/Util';

function Product(props) {

  const navigate = useNavigate();

  return (
    <div className="row p-1 my-1 product-content">
      <div className="col">{props.product.id}</div>
      <div className="col">
        <span>{props.product.name}</span>
      </div>
      <div className="col">
        <span>
          {truncate(props.product.description, 0, 32)}
        </span>
      </div>
      <div className="col">
        {props.product.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="col flex flex-column">
        <div className="row">
          <button
            type="button"
            className="btn btn-warning col mx-1 mb-1"
            onClick={() => {
              navigate(`/products/${props.product.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger col mx-1"
            data-bs-toggle="modal"
            //data-bs-toggle={classModalName}

            data-bs-target={`#staticBackdrop-${props.product.id}`}
            onClick={() => {
              // props.deleteProduct(props.product.id);
            }}
          >
            delete
          </button>
        </div>
        <Modal key={props.product.id} id={props.product.id} staticBackdrop={`staticBackdrop-${props.product.id}`} deleteProduct={props.deleteProduct} />
      </div>
    </div>
  );
}

export default Product;
