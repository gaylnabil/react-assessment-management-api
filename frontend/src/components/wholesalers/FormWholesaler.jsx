import React, { useEffect, useState } from 'react';
import api from '../../apis/api';
import { useNavigate } from 'react-router-dom';
import onValueChange from './../Events/ValueChangeEvent';

function FormWholesaler(props) {

    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        name: "",
    });

    useEffect(() => {
        if (props.isEditing) {

            const getWholesaler = async () => {
                const response = await api.get(`wholesalers/${props.wholesalerId}`);
                const data = await response.data;
                console.log("data: ", JSON.stringify(data));
                //console.log("data: ", response);
                setFormData(prevData => {
                    return { ...data }
                })
            }

            getWholesaler();
        }
    }, [ props.isEditing, props.wholesalerId ]);


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

        const requestWholesaler = async () => {
            try {
                let response = null;

                if (props.isEditing) {
                    response = await api.put(`wholesalers/${props.wholesalerId}`,
                        JSON.stringify(formData),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                } else {

                    response = await api.post('wholesalers',
                        JSON.stringify(formData),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                }
                console.log(response);
                if (response.status === 201 || response.status === 204) {
                    navigate("/wholesalers");
                }
            } catch (error) {
                console.log(error);
            }

        }

        requestWholesaler();
    }
    //console.log("formData: ", formData);


    return (
        <div className="container mt-3">
            <div className="row">
                <h1 className="text-center ">{props.isEditing ? "Edit Wholesaler" : "Add Wholesaler's information"} </h1>
                <form onSubmit={handleSubmit} className="col-lg-5 offset-3 center-block">
                    <div className="form-group mb-3 ">
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
                            placeholder="Enter Wholesaler's Name..."
                        />
                    </div>

                    <div className="form-group mb-3">

                        <button
                            type="submit"
                            className="btn btn-primary form-group"
                        >
                            {props.isEditing ? "Edit Wholesaler" : "Add Wholesaler"}

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
    )
}

export default FormWholesaler
