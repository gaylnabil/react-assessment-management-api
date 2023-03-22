import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import onValueChange from "./../Events/ValueChangeEvent";
import SelectTag from "./../SelectTag";
import FormErrors from "../validation/FormErrors";
import WholesalerService from './../../services/WholesalerService';
import { validate } from './../validation/Validate';
import StockService from './../../services/StockService';
function FormOrder(props) {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    clientName: "",
    quantity: 0,
    discount: 0,
    totalPrice: 0,
    beerId: 0,
    wholesalerId: 0,
    quantityRest: 0,
  });
  const [ formErrors, setFormErrors ] = useState({});
  const [ isSubmit, setIsSubmit ] = useState(false);

  const [ beerList, setBeerList ] = useState([]);
  const [ wholesalerList, setWholesalerList ] = useState([]);
  const [ beerPrice, setBeerPrice ] = useState(0);
  const [ stock, setStock ] = useState({
    quantity: 0,
  });

  useEffect(() => {
    if (props.isEditing) {
      // const getStock = async () => {
      //     const response = await api.get(`orders/${props.id}`);
      //     const data = await response.data;
      //     console.log("data: ", JSON.stringify(data));
      //     //console.log("data: ", response);
      //     setFormData((prevData) => {
      //         //return { ...prevData, ...data };
      //         return { ...prevData, ...data };
      //     });
      // };
      // getStock();
    } else {
      const getAllWholesalers = async () => {
        const data = await new WholesalerService().getAllWholesalers();

        setWholesalerList(data);
      };

      getAllWholesalers();
    }
  }, [ props.id, props.isEditing ]);


  useEffect(() => {

    if (Object.keys(formErrors).length > 0 || !isSubmit) return;

    const requestOrder = async () => {
      try {
        const response = await props.orderService.addOrder(formData);
        console.log(response);
        if (response.status === 201 || response.status === 204) {
          navigate("/orders");
        }
      } catch (error) {
        console.log(error);
      }
    }

    const updateQuantity = async () => {
      try {
        const response = await new StockService().updateStock(stock.id, { ...stock, quantity: formData.quantityRest });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    updateQuantity();
    requestOrder();

  }, [ formErrors, isSubmit, props.orderService, navigate, formData ])

  useEffect(() => {
    calculateTotalPrice(formData.quantity, beerPrice);
  }, [ formData.quantity, beerPrice ]);

  const handleValueChange = (e) => {

    setIsSubmit(false);
    onValueChange(e, setFormData);

    setFormErrors(validate(formData));
  };

  const handleOnBlur = (e) => {
    setFormErrors(validate(formData));
  }


  const handlePriceValueByBeerIdChange = (e) => {
    handleValueChange(e);

    const beerId = Number(e.target.value);

    const beer = beerList.find((beer) => {
      return beer.id === beerId;
    });

    const price = beer ? beer.price : 0;

    setBeerPrice(price);

    const getSingleStockByWholesalerAndBeer = async () => {
      const data = await props.orderService.getStockByWholesalerAndBeer(
        formData.wholesalerId,
        beerId
      );

      console.log("Single Stock:", data);

      setStock(data);
    };

    getSingleStockByWholesalerAndBeer();
  };

  const handleQuantityChange = (e) => {
    handleValueChange(e);

    setFormData(prevData => {
      return {
        ...prevData, quantityRest: (stock.quantity - Number(e.target.value))
      }
    })

    setFormErrors(validate(formData));

  };

  const handleWholesalerChanged = (e) => {
    handleValueChange(e);

    const id = Number(e.target.value);

    const getWholeSalerBeers = async (wholesalerID) => {
      if (wholesalerID !== 0) {
        const data = await props.orderService.getWholesalerItsBeers(
          wholesalerID
        );
        //console.log("data: ", response);
        setBeerList(data);
      }
    };

    getWholeSalerBeers(id);
    setFormData((prevData) => ({ ...prevData, beerId: 0 }));

    setStock({});
    setBeerPrice(0);
  };

  const calculateTotalPrice = (quantity, price) => {
    let discount = 0;

    if (quantity >= 10 && quantity < 20) {
      discount = 10;
    }
    if (quantity >= 20) {
      discount = 20;
    }
    const result = price * quantity * (1 - discount / 100);

    setFormData((prevData) => ({
      ...prevData,
      discount: discount,
      totalPrice: result,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  }

  return (
    <div className="container mt-3">
      {/* {JSON.stringify(formData, undefined, 2)} */}
      <div className="row">
        <h1 className="text-center ">
          {props.isEditing ? "Edit Order" : "New Order"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="col-sm-7 col-md-8 col-lg-7 offset-2 center-block"
        >
          <div className="form-group mb-3 ">
            <label htmlFor="name">Client Name</label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleValueChange}
              onBlur={handleOnBlur}
              placeholder="Enter Client Name..."
            />
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
                value={formData.wholesalerId}
                defaultValue={"Choose Wholesaler"}
                list={wholesalerList}
                onChange={handleWholesalerChanged}
                onBlur={handleOnBlur}
                required={true}
              />
            )}
          </div>
          <div className="form-group mb-3 ">
            <label htmlFor="name">Beer Name:</label>
            {props.isEditing ? (
              <b> {props.beerName}</b>
            ) : (
              <SelectTag
                id={"beerId"}
                name={"beerId"}
                label={"Select Beers"}
                value={formData.beerId}
                defaultValue={"Choose Beer"}
                list={beerList}
                onChange={handlePriceValueByBeerIdChange}
                required={true}
                onBlur={handleOnBlur}
              />
            )}
          </div>

          <div className="input-group mb-3 ">
            <ul>
              <li>
                <label htmlFor="name">Beer Price: &nbsp;</label>
                <b>
                  {beerPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                  })}
                </b>
              </li>
              <li>
                <label htmlFor="name">Quantity in the Stock: &nbsp;</label>
                <b>{stock.quantity}</b>
              </li>
            </ul>
          </div>

          <div className="form-group mb-3 ">
            <label htmlFor="name">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              min="0"
              max="100"
              onChange={handleQuantityChange}
              onBlur={handleOnBlur}
              placeholder="Enter Quantity Stock..."
            />
          </div>
          <div className="input-group mb-3 ">
            <label htmlFor="name">Discount:&nbsp;</label>
            <b>
              {" "}
              {(formData.discount / 100).toLocaleString("en-US", {
                style: "percent",
              })}
            </b>
          </div>
          <div className="input-group mb-3 ">
            <label htmlFor="name">Total Price: &nbsp;</label>

            <b style={{ color: "#009714" }}>
              {" "}
              {formData.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })}
            </b>
          </div>

          <div className="form-group mb-3">
            <button type="submit" className="btn btn-primary form-group">
              {props.isEditing ? "Edit Order" : "Add new Order"}
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

export default FormOrder;
