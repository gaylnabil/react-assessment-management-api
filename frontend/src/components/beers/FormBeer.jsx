import React, { useState, useEffect } from 'react';
import api from '../../apis/api';
import { useNavigate } from 'react-router-dom';
import SelectTag from '../SelectTag';
import onValueChange from './../Events/ValueChangeEvent';

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
        const breweriesFindAll = async (id) => {
            const response = await api.get(`breweries`);
            const data = await response.data;
            //console.log("data: ", JSON.stringify(data));
            //console.log("data: ", response);
            setBreweries(data);
        };

        breweriesFindAll();
    }, []);

    useEffect(() => {
        if (props.isEditing) {

            const getBeer = async () => {
                const response = await api.get(`beers/${props.beerId}`);
                const data = await response.data;
                console.log("data: ", JSON.stringify(data));
                //console.log("data: ", response);
                setFormData(prevData => {
                    return { ...data }
                })
            }

            getBeer();
        }
    }, [ props.isEditing, props.beerId ]);

    // const optionsElement = breweries.map((brewery) => (
    //     <option key={brewery.id} value={brewery.id} >{brewery.name}</option>
    // ));
    const handleValueChange = (event) => onValueChange(event, setFormData);

    // const handleValueChange = (event) => {
    //     setFormData(prevData => {
    //         // const {name, type, value, checked} = event.target;
    //         const { name, type, value } = event.target;
    //         console.log([ name ], ":", type, ":", value);
    //         return {
    //             ...prevData,
    //             [ name ]: type === 'number' ? Number(value) : value
    //         }
    //     });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit", formData);

        const requestBeer = async () => {
            try {
                let response = null;

                if (props.isEditing) {
                    response = await api.put(`beers/${props.beerId}`,
                        JSON.stringify(formData),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                } else {

                    response = await api.post('beers',
                        JSON.stringify(formData),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
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

                        <SelectTag

                            id={'breweryId'}
                            name={'breweryId'}
                            label={'Select Brewery'}
                            value={formData.breweryId ? formData.breweryId : 0}
                            defaultValue={"Choose the Company"}
                            list={breweries}
                            onChange={handleValueChange}
                            required={true}

                        />
                        {/* <select
                            value={formData.breweryId ? formData.breweryId : 0}
                            name="breweryId"
                            id="breweryId"
                            className="form-select"
                            aria-label="Select Brewery"
                            onChange={handleValueChange}
                        >
                            <option value="">Choose Brewery</option>
                            {optionsElement}
                        </select> */}
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
