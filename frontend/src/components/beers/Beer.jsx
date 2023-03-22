import React from 'react';

import { useNavigate } from "react-router-dom";
import Modal from '../Modal';

function Beer(props) {

  const navigate = useNavigate();

  return (
    <div className="row p-1 my-1 beer-content">
      <div className="col">{props.beer.id}</div>
      <div className="col">
        <span>{props.beer.name}</span>
      </div>
      <div className="col">
        <span>
          {(props.beer.content / 100).toLocaleString("en-US", {
            style: "percent",
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="col">
        {props.beer.price.toLocaleString("en-US", {
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
              navigate(`/beers/${props.beer.id}/edit`);
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger col mx-1"
            data-bs-toggle="modal"
            //data-bs-toggle={classModalName}

            data-bs-target={`#staticBackdrop-${props.beer.id}`}
            onClick={() => {
              // props.deleteBeer(props.beer.id);
            }}
          >
            delete
          </button>
        </div>
        <Modal key={props.beer.id} id={props.beer.id} staticBackdrop={`staticBackdrop-${props.beer.id}`} deleteBeer={props.deleteBeer} />
      </div>
    </div>
  );
}

export default Beer;
