import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormErrors from "./../validation/FormErrors";
import { useForm } from "react-hook-form";

function FormWholesaler(props) {

    const navigate = useNavigate();

    // Creates a ` useForm ` that can be used to submit a request.
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: "",
        }
    });

    console.log("errors:", Object.keys(errors));

    useEffect(() => {
        if (props.isEditing) {

            const getWholesaler = async () => {
                const data = await props.wholesalerService.getWholesaler(props.wholesalerId);
                console.log("data: ", Object.entries(data));
                //console.log("data: ", response);
                for (const [ name, value ] of Object.entries(data)) {

                    setValue(name, value);
                }
            }

            getWholesaler();
        }
    }, [ props.isEditing, props.wholesalerId, props.wholesalerService, setValue ]);

    const onSubmit = (formData) => {

        console.log("handleSubmit", formData);

        if (Object.keys(errors).length > 0) return;

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
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <h1 className="text-center ">{props.isEditing ? "Edit Wholesaler" : "Add Wholesaler's information"} </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="col-lg-5 offset-3 center-block">
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
                            {...register("name", {
                                required: 'The wholesaler cannot be empty.',

                            })}
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
                        {Object.keys(errors).length > 0 && <FormErrors errors={errors} />}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormWholesaler
