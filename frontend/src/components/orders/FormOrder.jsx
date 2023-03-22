import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTag from "../inputs/SelectTag";
import FormErrors from "../validation/FormErrors";
import WholesalerService from './../../services/WholesalerService';
import StockService from './../../services/StockService';
import { useForm } from "react-hook-form";

function FormOrder(props) {
  const navigate = useNavigate();
  const [ data, setData ] = useState({
    quantity: 0,
    discount: 0,
    totalPrice: 0,
    quantityRest: 0,
  });
  const [ beerList, setBeerList ] = useState([]);
  const [ wholesalerList, setWholesalerList ] = useState([]);
  const [ beerPrice, setBeerPrice ] = useState(0);
  const [ stock, setStock ] = useState({
    quantity: 0,
  });
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: {
      clientName: "",
      quantity: 0,
      discount: 0,
      totalPrice: 0,
      beerId: 0,
      wholesalerId: 0,
    }
  });

  console.log("errors:", Object.entries(errors));

  useEffect(() => {
    const getAllWholesalers = async () => {
      const dataResult = await new WholesalerService().getAllWholesalers();

      setWholesalerList(dataResult);
    };

    getAllWholesalers();

  }, [ props.id ]);


  useEffect(() => {

    const calculateTotalPrice = (quantity, price) => {
      let discount = 0;

      if (quantity >= 10 && quantity < 20) {
        discount = 10;
      }
      if (quantity >= 20) {
        discount = 20;
      }
      const result = price * quantity * (1 - discount / 100);
      setValue('discount', discount);
      setValue('totalPrice', result);

      setData((prevData) => ({
        ...prevData,
        discount: discount,
        totalPrice: result,
      }));


    }
    calculateTotalPrice(getValues("quantity"), beerPrice);

  }, [ getValues, setValue, beerPrice ]);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    console.log("[name, value]:", name, ",", value);
    setValue(name, value);
    switch (name) {
      case 'beerId':

        const beerId = Number(value);

        const beer = beerList.find((beer) => {
          return beer.id === beerId;
        });

        const price = beer ? beer.price : 0;

        setBeerPrice(price);

        const getSingleStockByWholesalerAndBeer = async () => {
          const data = await props.orderService.getStockByWholesalerAndBeer(
            getValues("wholesalerId"),
            beerId
          );

          console.log("Single Stock:", data);

          setStock(data);
        };
        console.log("BeerId:", value);
        getSingleStockByWholesalerAndBeer();
        break;

      case 'quantity':
        const rest = stock.quantity - Number(value);

        setData(prevData => ({ ...prevData, quantityRest: rest }));

        const calculateTotalPrice = (quantity, price) => {
          let discount = 0;

          if (quantity >= 10 && quantity < 20) {
            discount = 10;
          }
          if (quantity >= 20) {
            discount = 20;
          }
          const result = price * quantity * (1 - discount / 100);
          setValue('discount', discount);
          setValue('totalPrice', result);

          setData((prevData) => ({
            ...prevData,
            discount: discount,
            totalPrice: result,
          }));


        }
        calculateTotalPrice(Number(value), beerPrice);

        break;
      case 'wholesalerId':
        const id = Number(value);

        const getWholeSalerBeers = async (wholesalerID) => {
          if (wholesalerID !== 0) {
            const dataResult = await props.orderService.getWholesalerItsBeers(
              wholesalerID
            );
            setBeerList(dataResult);
          }
        };

        getWholeSalerBeers(id);
        setValue('beerId', '');

        setStock({});
        setBeerPrice(0);
        break;
      default:
        break;
    }
  };

  const onSubmit = (formData) => {
    console.log("onSubmit:", formData);

    if (Object.keys(errors).length > 0) return;
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
        const response = await new StockService().updateStock(stock.id, { ...stock, quantity: data.quantityRest });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    updateQuantity();
    requestOrder();

  }

  return (
    <div className="container mt-3">
      {/* {JSON.stringify(formData, undefined, 2)} */}
      <div className="row">
        <h1 className="text-center ">
          {props.isEditing ? "Edit Order" : "New Order"}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-sm-7 col-md-8 col-lg-7 offset-2 center-block"
        >
          <div className="form-group mb-3 ">
            <label htmlFor="name">Client Name</label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              {...register("clientName", {
                required: 'The Client cannot be empty.',

              })}
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
                register={
                  register("wholesalerId", {
                    required: 'The Wholesaler must be exist.',
                    onChange: handleValueChange
                  })}
                defaultValue={"Choose Wholesaler"}
                list={wholesalerList}
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
                register={
                  register("beerId", {
                    required: 'The Beer ust be exist.',
                    onChange: handleValueChange
                  })}
                label={"Select Beers"}
                defaultValue={"Choose Beer"}
                list={beerList}
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
                <label htmlFor="name">Quantity left in The stock: &nbsp;</label>
                <b>{stock.quantity}</b>
              </li>
            </ul>
          </div>

          <div className="form-group mb-3 ">
            <label htmlFor="name">Quantity</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              {...register("quantity", {
                onChange: handleValueChange,
                min: {
                  value: 1,
                  message: 'The Quantity cannot be Zero.'
                },
                max: {
                  value: 1000,
                  message: 'The Quantity cannot be more than 1000.'
                },
                validate: {
                  quantityLessThanStock: (value) => {
                    //console.log("value:", value);
                    return (stock && value <= stock.quantity) || "The number of beers ordered cannot be greater than the wholesaler's stock.";
                  }
                },
              })}
              min="0"
              max="2000"
              placeholder="Enter Quantity Stock..."
            />
          </div>
          <div className="input-group mb-3 ">
            <label htmlFor="name">Discount:&nbsp;</label>
            <b>
              {" "}
              {(data.discount / 100).toLocaleString("en-US", {
                style: "percent",
              })}
            </b>
          </div>
          <div className="input-group mb-3 ">
            <label htmlFor="name">Total Price: &nbsp;</label>

            <b style={{ color: "#009714" }}>
              {" "}
              {data.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              })}
            </b>
          </div>
          <div className="input-group mb-3 ">
            <label htmlFor="name">Quantity will Leave in the stock: &nbsp;</label>

            <b style={{ color: "#009714" }}>
              {data.quantityRest}
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
            {Object.keys(errors).length > 0 && <FormErrors errors={errors} />}
          </div>
        </form>
      </div>

    </div>
  );
}

export default FormOrder;
