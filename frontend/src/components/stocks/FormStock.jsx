import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectTag from "../inputs/SelectTag";
import WholesalerService from "../../services/WholesalerService";
import BeerService from './../../services/BeerService';
import FormErrors from "./../validation/FormErrors";
import { useForm } from "react-hook-form";

/**
 * 
 * @param {*} props 
 * @returns 
 */
function FormStock(props) {


    const navigate = useNavigate();
    const [ data, setData ] = useState({
        quantity: 0,
        beerId: 0,
        beer: null,
        wholesalerId: 0,
        wholesaler: null
    });

    // Creates a form that is used to fill in the defaults for the Stock. T
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            quantity: 0,
            beerId: 0,
            beer: null,
            wholesalerId: 0,
            wholesaler: null
        }
    });
    console.log("file: FormStock.jsx:37 ~ errors:", errors)


    const [ beerList, setBeerList ] = useState([]);
    const [ wholesalerList, setWholesalerList ] = useState([]);
    const [ stock, setStock ] = useState({
        quantity: 0,
    });
    const [ total, setTotal ] = useState(0);


    useEffect(() => {
        if (props.isEditing) {
            const getStock = async () => {
                const dataResult = await props.stockService.getStock(props.id);
                console.log("dataResult: ", JSON.stringify(dataResult));
                //console.log("dataResult: ", response);
                setData(dataResult);
                for (const [ name, value ] of Object.entries(dataResult)) {

                    setValue(name, value);
                }
            }

            getStock();
        } else {
            const GetList = async () => {
                let dataResult = await new WholesalerService().getAllWholesalers();
                setWholesalerList(dataResult);

                dataResult = await new BeerService().getAllBeers();
                setBeerList(dataResult);
            }

            GetList();
        }
    }, [ props.id, props.isEditing, setValue, props.stockService ]);

    useEffect(() => {

        if (data.wholesalerId === 0 || data.beerId === 0) return;

        // Gets the stock by wholesaler and beer. If there is no stock returns 0
        const getStockByWholesalerAndBeer = async () => {
            const stock = await props.stockService.getStockByWholesalerAndBeer(
                data.wholesalerId,
                data.beerId
            );

            console.log("Single Stock:", stock);


            setStock(stock ? stock : { quantity: 0 });
        }

        getStockByWholesalerAndBeer();

    }, [ data.wholesalerId, data.beerId, props.stockService ]);


    useEffect(() => {
        const qteTotal = Number(data.quantity) + Number(stock.quantity);
        setTotal(qteTotal);
    }, [ data.quantity, stock.quantity ]);


    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value);
        setData(prevData => ({ ...prevData, [ name ]: value }))
    }

    // Handles the submission of a Stock
    const onSubmit = (formData) => {
        console.log("FormStock.jsx:149 ~ onSubmit ~ formData:", formData)


        if (Object.keys(errors).length > 0) return;


        const requestStock = async () => {
            try {
                // console.log("handleSubmit", formData);
                let response = null;
                if (props.isEditing) {
                    response = await props.stockService.updateStock(props.id, formData);

                } else if (stock.id !== undefined) {
                    console.log("stock: ", stock);
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
                <form onSubmit={handleSubmit(onSubmit)} className="col-sm-5 offset-4 center-block">
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
                            })}
                            min="0"
                            max="2000"
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
                        {Object.keys(errors).length > 0 && <FormErrors errors={errors} />}
                    </div>
                </form>
            </div>
        </div>
    );
}
export default FormStock;
