import React from 'react'
import WholesalerList from '../components/wholesalers/WholesalerList'
import { useNavigate } from 'react-router-dom'

function WholesalersPage() {

    const navigate = useNavigate();
    return (
        <div className="container">
            <h1 className="text-center py-2">Wholesalers</h1>
            <div className="row my-4">
                <div className="col px-2 text-center">
                    <div className="row text-center">
                        <div className="col-sm-5 col-md-6 py-1">
                            <button
                                type="button"
                                className="btn btn-primary form-control"
                                onClick={() => { navigate("/wholesalers/new", { state: { isEditing: false } }) }}
                            >
                                Add wholesaler
                            </button>
                        </div>
                        <div className="col-sm-5 offset-sm-2 col-md-6 offset-md-0 py-1">
                            <button
                                type="button"
                                className="btn btn-danger form-control"
                                onClick={() => { navigate("/stocks/new", { state: { isEditing: false } }) }}
                            >
                                Add New Stock
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <WholesalerList />
        </div>
    )
}

export default WholesalersPage
