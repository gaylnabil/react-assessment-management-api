import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BreweriesPage from '../pages/BreweriesPage';
import WholesalersPage from '../pages/WholesalersPage';
import BeersCreatePage from '../pages/BeersCreatePage';
import WholesalersCreatePage from '../pages/WholesalersCreatePage';
import StocksPage from '../pages/StocksPage';
import OrdersPage from '../pages/OrdersPage';
import OrderCreatePage from '../pages/OrderCreatePage';
// import FormBeer from '../components/Beers/FormBeer';
function Routers() {
    return (
        <Routes>

            <Route path='/' element={<BreweriesPage />} />
            <Route path='breweries' element={<BreweriesPage />} />
            <Route path='beers' >
                <Route path='new' element={<BeersCreatePage />} />
                <Route path=':id/edit/' element={<BeersCreatePage />} />
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
