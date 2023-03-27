import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectTag from '../inputs/SelectTag';
import onValueChange from './../Events/ValueChangeEvent';
import BreweryService from './../../services/BreweryService';

function FormBeer(props) {

    const navigate = useNavigate();
    const [ breweries, setBreweries ] = useState([]);


    const [ formData, setFormData ] = useState({
        name: "",
        content: 1,
        price: 0,
        breweryId: null,

    });

    useEffect(() => {
        const breweriesFindAll = async () => {
            const data = await new BreweryService().getAllBreweries();
            //console.log("data: ", JSON.stringify(data));
            //console.log("data: ", response);
            setBreweries(data);
        };

        breweriesFindAll();
    }, []);

    useEffect(() => {
        if (props.isEditing) {

            const getBeer = async () => {
                const data = await props.beerService.getBeer(props.beerId);
                console.log("data: ", JSON.stringify(data));
                //console.log("data: ", response);
                setFormData(data);
            }

            getBeer();
        }
    }, [ props.isEditing, props.beerId, props.beerService ]);

    const optionsElement = breweries.map((brewery) => (
        <option key={brewery.id} value={brewery.id} >{brewery.name}</option>
    ));
    const handleValueChange = (event) => onValueChange(event, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit", formData);

        const requestBeer = async () => {
            try {
                let response = null;

                if (props.isEditing) {
                    response = await props.beerService.updateBeer(props.beerId, formData)
                } else {

                    response = await props.beerService.addBeer(formData)
                }
                console.log(response);
                if (response.status === 201 || response.status === 204) {
                    navigate("/breweries");
                }
            } catch (error) {
                console.log(error);
            }

        }

        requestBeer();
    }
    //console.log("formData: ", formData);


    return (
        <div className="container mt-3">
            <div>
                <h1>{props.isEditing ? "Edit Beer" : "Add Beer's information"} </h1>
                <form onSubmit={handleSubmit} className="col-lg-3 center-block">
                    <div className="form-group mb-3">
                        <label
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleValueChange}
                            placeholder="Enter Beer's Name..."
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label
                            htmlFor="content"
                        >
                            Alcohol Content
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="content"
                            name="content"
                            onChange={handleValueChange}
                            placeholder="Alcohol Content"
                            min="0"
                            max="100"
                            step="0.01"
                            value={formData.content}
                        // defaultValue={formData.content}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label
                            htmlFor="content"
                        >
                            Price <span>($)</span>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            onChange={handleValueChange}
                            placeholder="Price ($)"
                            value={formData.price}
                            // defaultValue={formData.price}
                            min="0"
                            max="99999"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label
                            htmlFor="breweryId"
                        >
                            Company name
                        </label>

                        {/* <SelectTag

                            id={'breweryId'}
                            name={'breweryId'}
                            label={'Select Brewery'}
                            value={formData.breweryId ? formData.breweryId : 0}
                            defaultValue={"Choose the Company"}
                            list={breweries}
                            onChange={handleValueChange}
                            required={true}

                        /> */}
                        <select
                            value={formData.breweryId ? formData.breweryId : 0}
                            name="breweryId"
                            id="breweryId"
                            className="form-select"
                            aria-label="Select Brewery"
                            onChange={handleValueChange}
                        >
                            <option value="">Choose Brewery</option>
                            {optionsElement}
                        </select>
                    </div>
                    <div className="form-group mb-3">

                        <button
                            type="submit"
                            className="btn btn-primary "
                        >
                            {props.isEditing ? "Edit Beer" : "Add Beer"}

                        </button>

                        <button
                            type="button"
                            className="btn btn-warning mx-1"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormBeer
