import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectTag from "../SelectTag";
import onValueChange from "../Events/ValueChangeEvent";
import WholesalerService from "../../services/WholesalerService";
import BeerService from './../../services/BeerService';
import { validate } from './../validation/Validate';
import FormErrors from "./../validation/FormErrors";

/**
 * 
 * @param {*} props 
 * @returns 
 */
function FormStock(props) {


  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    quantity: 0,
    beerId: 0,
    beer: null,
    wholesalerId: 0,
    wholesaler: null
  });

  const [ beerList, setBeerList ] = useState([]);
  const [ wholesalerList, setWholesalerList ] = useState([]);
  const [ stock, setStock ] = useState({
    quantity: 0,
  });
  const [ total, setTotal ] = useState(0);
  const [ formErrors, setFormErrors ] = useState({});
  const [ isSubmit, setIsSubmit ] = useState(false);


  useEffect(() => {
    if (props.isEditing) {
      const getStock = async () => {
        const data = await props.stockService.getStock(props.id);
        console.log("data: ", JSON.stringify(data));
        //console.log("data: ", response);
        setFormData(data);
      }

      getStock();
    } else {
      const GetList = async () => {
        let data = await new WholesalerService().getAllWholesalers();
        setWholesalerList(data);

        data = await new BeerService().getAllBeers();
        setBeerList(data);
      }

      GetList();
    }
  }, [ props.id, props.isEditing, props.stockService ]);

  useEffect(() => {

    if (formData.wholesalerId === 0 || formData.beerId === 0) return;
    const getStockByWholesalerAndBeer = async () => {
      const stock = await props.stockService.getStockByWholesalerAndBeer(
        formData.wholesalerId,
        formData.beerId
      );

      console.log("Single Stock:", stock);


      setStock(stock ? stock : { quantity: 0 });
    };

    getStockByWholesalerAndBeer();

  }, [ formData.wholesalerId, formData.beerId, props.stockService ]);


  useEffect(() => {
    setTotal(formData.quantity + stock.quantity);
  }, [ formData.quantity, stock.quantity ]);

  useEffect(() => {

    if (Object.keys(formErrors).length > 0 || !isSubmit) return;

    const requestStock = async () => {
      try {
        // console.log("handleSubmit", formData);
        let response = null;
        if (props.isEditing) {
          response = await props.stockService.updateStock(props.id, formData);

        } else if (stock.id !== undefined) {
          console.log("stock: ", stock);
          //setFormData(prevData => ({ ...prevData, quantity: total }));
          //setStock(prevData => ({ ...prevData, quantity: total }))
          console.log("handleSubmit (2)", formData);
          response = await props.stockService.updateStock(stock.id, { ...stock, quantity: total });
        }
        else {
          response = await props.stockService.addStock(formData);
        }

        console.log(response);
        if (response.status === 201 || response.status === 204) {
          navigate("/wholesalers");
        }
      } catch (error) {
        console.error(error);
      }
    };

    requestStock();
  }, [ formErrors, isSubmit, stock, props.id, formData, props.stockService, props.isEditing, navigate, total ])


  const handleValueChange = (event) => {
    setIsSubmit(false);
    onValueChange(event, setFormData);
    setFormErrors(validate(formData));

    const { type, value } = event.target;
    if (type === 'number') {
      setTotal(stock.quantity + Number(value))
    }
  };

  const handleOnBlur = (event) => {
    onValueChange(event, setFormData);
    setFormErrors(validate(formData));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
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
                onBlur={handleOnBlur}
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
                onBlur={handleOnBlur}
                required={true}
              />
            )}
          </div>

          <div className="input-group mb-3 ">
            <ul>
              <li>
                <span>Quantity in the Stock:&nbsp;</span>
                <span><b>{stock ? stock.quantity : 0}</b></span>
              </li>
              {
                !props.isEditing &&
                <li>
                  <span>Stock Total:&nbsp;</span>
                  <span><b>{total}</b></span>
                </li>
              }

            </ul>
          </div>
          <div className="form-group mb-3 ">
            <label htmlFor="name">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              min="0"
              max="1000"
              value={formData.quantity}
              onChange={handleValueChange}
              onBlur={handleOnBlur}
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
          <div className="form-group mb-3">
            {Object.keys(formErrors).length > 0 && <FormErrors errors={formErrors} />}
          </div>
        </form>
      </div>
    </div>
  );
}
export default FormStock;
