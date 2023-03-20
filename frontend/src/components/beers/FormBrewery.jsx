import React, { useState } from 'react';
import api from '../../apis/api';
import onValueChange from './../Events/ValueChangeEvent';

function FormBrewery() {

    const [ formData, setFormData ] = useState({
        name: "",
    });

    // const handleValueChange = (event) => {
    //     setFormData(prevData => {
    //         // const {name, type, value, checked} = event.target;
    //         const { name, value } = event.target;
    //         console.log([ name ], ":", value);
    //         return {
    //             ...prevData,
    //             [ name ]: value
    //         }
    //     });
    // }
    const handleValueChange = (event) => onValueChange(event, setFormData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit", formData);

        const addBeer = async () => {
            try {
                const response = await api.post(
                    'breweries',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                console.log(response);
            } catch (error) {
                console.log(error);
            }

        }

        addBeer();

    }
    return (
        <div className="container mt-3">
            <div>
                <h1>Add information of Brewery</h1>
                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter Brewery's Name..."
                        />
                    </div>

                    <div className="form-group mb-3">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            New Brewery
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormBrewery;
