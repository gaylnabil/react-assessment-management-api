import React, { useState } from 'react';
import { postRequest } from '../../apis/api';
import onValueChange from '../Events/ValueChangeEvent';

function FormCompany() {

    const [ formData, setFormData ] = useState({
        name: "",
    });

    const handleValueChange = (event) => onValueChange(event, setFormData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit", formData);

        const addProduct = async () => {
            try {
                const response = await postRequest('companies', formData)
                console.log(response);
            } catch (error) {
                console.log(error);
            }

        }

        addProduct();

    }
    return (
        <div className="container mt-3">
            <div>
                <h1>Add information of Company</h1>
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
                            placeholder="Enter Company's Name..."
                        />
                    </div>

                    <div className="form-group mb-3">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            New Company
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormCompany;
