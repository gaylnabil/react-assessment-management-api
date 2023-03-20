import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import SelectTag from "../SelectTag";
import onValueChange from "../Events/ValueChangeEvent";

function FormStock(props) {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    quantity: 0,
    beerId: 0,
    wholesalerId: 0,
  });

  const [ beerList, setBeerList ] = useState([]);
  const [ wholesalerList, setWholesalerList ] = useState([]);

  useEffect(() => {
    if (props.isEditing) {
      const getStock = async () => {
        const response = await api.get(`stocks/${props.id}`);
        const data = await response.data;
        console.log("data: ", JSON.stringify(data));
        //console.log("data: ", response);
        setFormData((prevData) => {
          //return { ...prevData, ...data };
          return { ...data };
        });
      };

      getStock();
    } else {
      const GetList = async (name, setData) => {
        const response = await api.get(name);
        const data = await response.data;
        //console.log("data: ", JSON.stringify(data));
        //console.log("data: ", response);
        setData(data);
      };

      GetList("wholesalers", setWholesalerList);
      GetList("beers", setBeerList);
    }
  }, [ props.id, props.isEditing ]);

  const handleValueChange = (event) => onValueChange(event, setFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit", JSON.stringify(formData));

    const requestStock = async () => {
      try {
        let response = null;
        if (props.isEditing) {
          response = await api.put(
            `stocks/${props.id}`,
            JSON.stringify(formData),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await api.post(`stocks`, JSON.stringify(formData), {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        console.log(response);
        if (response.status === 201 || response.status === 204) {
          navigate("/wholesalers");
        }
      } catch (error) {
        console.log(error);
      }
    };

    requestStock();
  };

  // console.log("file: FormStock.jsx:89 ~ FormStock ~ formData:", formData);
  // console.log("file: FormStock.jsx:89 ~ FormStock ~ wholesalerList:", wholesalerList);
  // console.log("file: FormStock.jsx:90 ~ FormStock ~ beerList:", beerList);

  return (
    <div className="container mt-3">
      <div className="row">
        <h1 className="text-center ">
          {props.isEditing ? "Edit Stock quantity" : "Add new Stock"}{" "}
        </h1>
        <form onSubmit={handleSubmit} className="col-sm-5 offset-4 center-block">
          <div className="form-group mb-3 ">
            <label htmlFor="name">Beer Name:</label>
            {props.isEditing ? (
              <b> {props.beerName}</b>
            ) : (
              <SelectTag
                id={"beerId"}
                name={"beerId"}
                label={"Select Beers"}
                value={formData.beerId ? formData.beerId : 0}
                defaultValue={"Choose Beer"}
                list={beerList}
                onChange={handleValueChange}
                required={true}
              />
            )}
          </div>

          <div className="form-group mb-3 ">
            <label htmlFor="name">Wholesaler Name:</label>
            {props.isEditing ? (
              <b> {props.wholesalerName}</b>
            ) : (
              <SelectTag
                id={"wholesalerId"}
                name={"wholesalerId"}
                label={"Wholesaler Name"}
                value={formData.wholesalerId ? formData.wholesalerId : 0}
                defaultValue={"Choose Wholesaler"}
                list={wholesalerList}
                onChange={handleValueChange}
                required={true}
              />
            )}
          </div>

          <div className="form-group mb-3 ">
            <label htmlFor="name">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleValueChange}
              placeholder="Enter Quantity Stock..."
            />
          </div>

          <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary form-group">
              {props.isEditing ? "Edit Stock" : "Add new Stock"}
            </button>

            <button
              type="button"
              className="btn btn-warning mx-1 px-5 form-group"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default FormStock;
