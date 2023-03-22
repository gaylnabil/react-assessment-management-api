import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import onValueChange from './../Events/ValueChangeEvent';
import { validate } from './../validation/Validate';
import FormErrors from "./../validation/FormErrors";

function FormWholesaler(props) {

    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        name: "",
    });

    const [ formErrors, setFormErrors ] = useState({});
    const [ isSubmit, setIsSubmit ] = useState(false);

    useEffect(() => {
        if (props.isEditing) {

            const getWholesaler = async () => {
                const data = await props.wholesalerService.getWholesaler(props.wholesalerId);
                console.log("data: ", JSON.stringify(data));
                //console.log("data: ", response);
                setFormData(data);
            }

            getWholesaler();
        }
    }, [ props.isEditing, props.wholesalerId, props.wholesalerService ]);

    useEffect(() => {

        if (Object.keys(formErrors).length > 0 || !isSubmit) return;

        const requestWholesaler = async () => {
            try {
                let response = null;

                if (props.isEditing) {
                    response = await props.wholesalerService.updateWholesaler(props.wholesalerId, formData);
                } else {
                    response = await props.wholesalerService.addWholesaler(formData)
                }
                console.log(response);
                if (response.status === 201 || response.status === 204) {
                    navigate("/wholesalers");
                }
            } catch (error) {
                console.error(error);
            }

        }

        requestWholesaler();
    }, [ formData, formErrors, props.wholesalerService, isSubmit, navigate, props.isEditing, props.wholesalerId ])

    const handleValueChange = (event) => {
        setIsSubmit(false);
        onValueChange(event, setFormData);
        setFormErrors(validate(formData));
    }
    const handleOnBlur = (event) => {

        setFormErrors(validate(formData));
    }
    const handleOnKeyDown = (event) => {

        setFormErrors(validate(formData));
        console.log("event.key:", event.key);
    }

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
        setFormErrors(validate(formData));
        setIsSubmit(true);

        console.log("handleSubmit", formData);
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
                            onBlur={handleOnBlur}
                            onKeyPress={handleOnKeyDown}
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
                    <div className="form-group mb-3">
                        {Object.keys(formErrors).length > 0 && <FormErrors errors={formErrors} />}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormWholesaler
