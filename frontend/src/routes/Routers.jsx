import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CompaniesPage from '../pages/CompaniesPage';
import WholesalersPage from '../pages/WholesalersPage';
import ProductsCreatePage from '../pages/ProductsCreatePage';
import WholesalersCreatePage from '../pages/WholesalersCreatePage';
import StocksPage from '../pages/StocksPage';
import OrdersPage from '../pages/OrdersPage';
import OrderCreatePage from '../pages/OrderCreatePage';


const Routers = () => {
    return (
        <Routes>

            <Route path='/' element={<CompaniesPage />} />
            <Route path='companies' element={<CompaniesPage />} />
            <Route path='products' >
                <Route path='new' element={<ProductsCreatePage />} />
                <Route path=':id/edit/' element={<ProductsCreatePage />} />
            </Route>
            <Route path='wholesalers' element={<WholesalersPage />} />
            <Route path='wholesalers' >
                <Route path='new' element={<WholesalersCreatePage />} />
                <Route path=':id/edit/' element={<WholesalersCreatePage />} />
            </Route>
            <Route path='stocks' >
                <Route path='new' element={<StocksPage />} />
                <Route path=':id/edit/' element={<StocksPage />} />
            </Route>
            <Route path='orders' >
                <Route index element={<OrdersPage />} />
                <Route path='new' element={<OrderCreatePage />} />
                <Route path=':id/edit/' element={<StocksPage />} />
            </Route>

        </Routes>
    )
}

export default Routers
