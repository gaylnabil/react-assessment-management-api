import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getWholesalerItsBeers,
  getDataList,
  postRequest,
  getStockByWholesalerAndBeer,
} from "../../apis/api";
import onValueChange from "./../Events/ValueChangeEvent";
import SelectTag from "./../SelectTag";
import FormErrors from "../validation/FormErrors";

function FormOrder(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    quantity: 0,
    discount: 0,
    totalPrice: 0,
    beerId: 0,
    wholesalerId: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [beerList, setBeerList] = useState([]);
  const [wholesalerList, setWholesalerList] = useState([]);
  const [beerPrice, setBeerPrice] = useState(0);
  const [quantityStock, setQuantityStock] = useState(0);

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
      const GetList = async (url) => {
        const data = await getDataList(url);

        setWholesalerList(data);
      };

      GetList("wholesalers");
      // GetList("beers", setBeerList);
    }
  }, [props.id, props.isEditing]);

  const handleValueChange = (e) => {
    onValueChange(e, setFormData);
    setFormErrors(validation(formData));
    // console.log("handleValueChange formErrors:", formErrors, "IsSubmit:", isSubmit);
  };

  const handleOnBlur = (e) => {
    setFormErrors(validation(formData));
  };

  const handlePriceValueByBeerIdChange = (e) => {
    handleValueChange(e);

    const beerId = Number(e.target.value);

    const beer = beerList.find((beer) => {
      return beer.id === beerId;
    });

    const price = beer ? beer.price : 0;

    setBeerPrice(price);
    calculateTotalPrice(formData.quantity, price);

    const getSingleStockByWholesalerAndBeer = async () => {
      const data = await getStockByWholesalerAndBeer(
        formData.wholesalerId,
        beerId
      );

      console.log("Single Stock:", data);

      setQuantityStock(data.quantity);
    };

    getSingleStockByWholesalerAndBeer();
  };

  const handleQuantityChange = (e) => {
    handleValueChange(e);
    const quantity = Number(e.target.value);
    calculateTotalPrice(quantity, beerPrice);
  };

  const handleWholesalerChanged = (e) => {
    handleValueChange(e);

    const id = Number(e.target.value);

    const getWholeSalerBeers = async (wholesalerID) => {
      if (wholesalerID !== 0) {
        const data = await getWholesalerItsBeers(wholesalerID);
        //console.log("data: ", response);
        setBeerList(data);
      }
    };

    getWholeSalerBeers(id);
    setFormData((prevData) => ({ ...prevData, beerId: 0 }));

    setQuantityStock(0);
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

  const validation = (fields) => {
    const errors = {};
    // console.log("fields: ", fields);

    for (const [name, value] of Object.entries(fields)) {
      // console.log("name:", name, ", value:", value);
      switch (name) {
        case "clientName":
          if (!value) errors.ErrorValue = "The order cannot be empty";
          break;
        case "quantity":
          if (value === 0) errors.ErrorQuantity = "The Quantity cannot be Zero";
          break;
        case "beerId":
          if (value === 0) errors.ErrorBeer = "The Beer must exist";
          break;
        case "wholesalerId":
          if (!value) errors.ErrorWholesaler = "The wholesaler must exist";
          break;
        default:
          break;
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validation(formData));
    setIsSubmit(true);

    // console.log("🚀 ~ file: FormOrder.jsx:157 ~ handleSubmit ~ isSubmit:", isSubmit)
    if (Object.keys(formErrors).length > 0) return;

    const requestOrder = async () => {
      try {
        const response = await postRequest(`orders`, formData);
        console.log(response);
        if (response.status === 201 || response.status === 204) {
          navigate("/orders");
        }
      } catch (error) {
        console.log(error);
      }
    };
    requestOrder();
  };

  // console.log("file: FormStock.jsx:89 ~ FormStock ~ formData:", formData);

  return (
    <div className="container mt-3">
      {JSON.stringify(formData, undefined, 2)}
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
                <b>{quantityStock}</b>
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
            {isSubmit && <FormErrors errors={formErrors} />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormOrder;
