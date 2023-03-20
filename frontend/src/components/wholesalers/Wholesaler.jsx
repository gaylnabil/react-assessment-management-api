import React from 'react'
import { useNavigate } from 'react-router-dom'

function Wholesaler(props) {
    const navigate = useNavigate();

    const stocks = props.wholesaler.stocks;

    const stockList = stocks && stocks.map(stock => {
        // console.log("yes yes:", { ...stock })
        return (
            <tr key={stock.id}>
                <th scope="row">&nbsp;</th>
                <td>{stock.id}</td>
                <th scope="row">{stock.beer.name}</th>
                <td>{stock.quantity}</td>
                <td>
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            navigate(`/stocks/${stock.id}/edit/`, { state: { beerName: stock.beer.name, wholesalerName: props.wholesaler.name, isEditing: true } })
                        }}>Edit</button>
                </td>
            </tr>
        )
    })
    // console.log("🚀 ~ file: Wholesaler.jsx:15 ~ stockList ~ stockList :", props.wholesaler.stocks)

    return (
        <>
            <tr>
                <th scope="row">{props.wholesaler.name}</th>
                <td >&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td><button
                    className="btn btn-success"
                    onClick={() => { navigate(`/wholesalers/${props.wholesaler.id}/edit/`, { state: { isEditing: true } }) }}
                >Edit</button></td>

            </tr>
            <tr>
                <th scope="row">&nbsp;</th>
                <th colSpan="4" scope="row">Stock</th>
            </tr>
            {stockList}
        </>

    )
}

export default Wholesaler
