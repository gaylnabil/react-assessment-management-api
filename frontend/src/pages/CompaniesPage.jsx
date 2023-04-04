import React, { useState, useEffect } from 'react'
import Company from '../components/Company';
import { useNavigate } from 'react-router-dom';
import CompanyService from './../services/CompanyService';
import ProductService from './../services/ProductService';
function CompaniesPage() {

    const [ companies, setCompanies ] = useState([]);
    const navigate = useNavigate();

    const companyService = new CompanyService();
    const productService = new ProductService();

    const getCompanies = async () => {
        const data = await companyService.getBrewersWithProducts();
        //console.log("data: ", JSON.stringify(data));
        setCompanies(data);
    };
    useEffect(() => {
        getCompanies();
    }, []);

    // Delete Product
    const deleteProduct = async (productId) => {
        try {

            const response = await productService.deleteProduct(productId);
            if (response.status === 204) {
                getCompanies();
            }

        } catch (error) {
            console.log('Error:', error);
        }

    };

    const companyElements = companies.map((brw) => {

        return (
            <Company
                key={brw.id}
                name={brw.name}
                products={brw.products}
                deleteProduct={deleteProduct}
            />
        )

    });

    return (
        <div>
            <h1 className="text-center">Companies</h1>
            {/* <p>{JSON.stringify(companies, null, 2)}</p> */}
            <div className='container'>
                <div className="row my-4">
                    <div className="col px-2 text-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => { navigate("/products/new") }}
                        >
                            Add new Product
                        </button>
                    </div>

                </div>
                <div className='company-titles row py-2 flex flex-center align-center bg-black text-white'>
                    <div className="col"><h6>Companies</h6></div>
                    <div className="col"><h6>Product Name</h6></div>
                    <div className="col"><span>Description</span></div>
                    <div className="col">Price</div>
                    <div className="col">#</div>
                </div>
                <div className="row">
                    {companyElements}
                </div>
            </div>
        </div>
    )
}

export default CompaniesPage;
