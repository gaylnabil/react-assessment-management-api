import React from 'react'
import FormStock from '../components/stocks/FormStock'
import { useParams, useLocation } from 'react-router-dom';

function StockEditPage() {
    const { id } = useParams();
    const { state } = useLocation();

    console.log("🚀 ~ file: StockEditPage.jsx:9 ~ StockEditPage ~ stock:", state)
    return (
        <div>
            <h1>Stock id: {id}</h1>
            <FormStock id={id} beerName={state.beerName} wholesalerName={state.wholesalerName} isEditing={state.isEditing} />
        </div>
    )
}

export default StockEditPage;
