import React from 'react'
import Product from './products/Product'

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
