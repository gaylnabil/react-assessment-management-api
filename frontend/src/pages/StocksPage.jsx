import React from 'react'
import FormStock from '../components/stocks/FormStock'
import { useParams, useLocation } from 'react-router-dom';
import StockService from './../services/StockService';

function StockEditPage() {
    const stockService = new StockService();

    const { id } = useParams();
    const { state } = useLocation();

    console.log("🚀 ~ file: StockEditPage.jsx:9 ~ StockEditPage ~ stock:", state)
    return (
        <div>
            <h1>Stock id: {id}</h1>
            <FormStock
                id={id}
                productName={state.productName}
                wholesalerName={state.wholesalerName}
                isEditing={state.isEditing}
                stockService={stockService}
            />
        </div>
    )
}

export default StockEditPage;
