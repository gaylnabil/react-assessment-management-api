import React from 'react'
import Product from './products/Product'

/**
 * Renders a Company component with its name and list of products.
 *
 * @param {Object} props - The properties object containing the following:
 *   @param {string} props.name - The name of the company to display.
 *   @param {Array<Object>} props.products - An array of product objects to display.
 *   @param {function} props.deleteProduct - A function to delete a product from the list.
 *   @param {function} props.onSelectProduct - A function to select a product from the list.
 *
 * @returns {JSX.Element} Returns JSX element that displays company information and products. 
 */
function Company(props) {
    const productElements = props.products.map((product) => (

        <Product key={product.id} product={product} deleteProduct={props.deleteProduct} onSelectProduct={props.onSelectProduct} />

    ));
    console.log("props.products:", props.products);
    return (
        <div>
            <div className='row py-1'>
                <div className="col border border-primary text-white company-content"><h6>{props.name}</h6></div>
            </div>
            {productElements}

        </div>
    )
}

export default Company
