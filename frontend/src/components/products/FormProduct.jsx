import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import SelectTag from '../inputs/SelectTag';
import onValueChange from '../Events/ValueChangeEvent';
import CompanyService from './../../services/CompanyService';

function FormProduct(props) {

    const navigate = useNavigate();
    const [ companies, setCompanies ] = useState([]);


    const [ formData, setFormData ] = useState({
        name: "",
        description: 1,
        price: 0,
        companyId: null,

    });

    useEffect(() => {
        const companiesFindAll = async () => {
            const data = await new CompanyService().getAllCompanies();
            //console.log("data: ", JSON.stringify(data));
            setCompanies(data);
        };

        companiesFindAll();
    }, []);

    useEffect(() => {
        if (props.isEditing) {

            const getProduct = async () => {
                const data = await props.productService.getProduct(props.productId);
                console.log("data: ", JSON.stringify(data));
                setFormData(data);
            }

            getProduct();
        }
    }, [ props.isEditing, props.productId, props.productService ]);

    const optionsElement = companies.map((company) => (
        <option key={company.id} value={company.id} >{company.name}</option>
    ));
    const handleValueChange = (event) => onValueChange(event, setFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit", formData);

        const requestProduct = async () => {
            try {
                let response = null;

                if (props.isEditing) {
                    response = await props.productService.updateProduct(props.productId, formData)
                } else {

                    response = await props.productService.addProduct(formData)
                }
                console.log(response);
                if (response.status === 201 || response.status === 204) {
                    navigate("/companies");
                }
            } catch (error) {
                console.log(error);
            }

        }

        requestProduct();
    }

    return (
        <div className="container mt-3">
            <div>
                <h1>{props.isEditing ? "Edit Product" : "Add Product's information"} </h1>
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
                            placeholder="Enter Product's Name..."
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            type="number"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={handleValueChange}
                            placeholder="Description"
                            value={formData.description}
                        ></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label
                            htmlFor="price"
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
                            htmlFor="companyId"
                        >
                            Company name
                        </label>

                        {/* <SelectTag

                            id={'companyId'}
                            name={'companyId'}
                            label={'Select Company'}
                            value={formData.companyId ? formData.companyId : 0}
                            defaultValue={"Choose the Company"}
                            list={companies}
                            onChange={handleValueChange}
                            required={true}

                        /> */}
                        <select
                            value={formData.companyId ? formData.companyId : 0}
                            name="companyId"
                            id="companyId"
                            className="form-select"
                            aria-label="Select Company"
                            onChange={handleValueChange}
                        >
                            <option value="">Choose Company</option>
                            {optionsElement}
                        </select>
                    </div>
                    <div className="form-group mb-3">

                        <button
                            type="submit"
                            className="btn btn-primary "
                        >
                            {props.isEditing ? "Edit Product" : "Add Product"}

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

export default FormProduct
