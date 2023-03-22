import React, { useState, useEffect } from 'react'
import Brewery from '../components/Brewery';
import { useNavigate } from 'react-router-dom';
import BreweryService from './../services/BreweryService';
import BeerService from './../services/BeerService';
function BreweriesPage() {

    const [ breweries, setBreweries ] = useState([]);
    const navigate = useNavigate();

    const breweryService = new BreweryService();
    const beerService = new BeerService();

    const getBreweries = async () => {
        const data = await breweryService.getBrewersWithBeers();
        //console.log("data: ", JSON.stringify(data));
        //console.log("data: ", response);
        setBreweries(data);
    };
    useEffect(() => {
        getBreweries();
    }, [])

    // Delete Beer
    const deleteBeer = async (beerId) => {
        try {

            const response = await beerService.deleteBeer(beerId);
            if (response.status === 204) {
                getBreweries();
            }

        } catch (error) {
            console.log('Error:', error);
        }

    };

    const breweryElements = breweries.map((brw) => {

        return (
            <Brewery
                key={brw.id}
                name={brw.name}
                beers={brw.beers}
                deleteBeer={deleteBeer}
            />
        )

    });

    return (
        <div>
            <h1 className="text-center">Breweries</h1>
            {/* <p>{JSON.stringify(breweries, null, 2)}</p> */}
            <div className='container'>
                <div className="row my-4">
                    <div className="col px-2 text-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => { navigate("/beers/new") }}
                        >
                            Add new Beer
                        </button>
                    </div>

                </div>
                <div className='brewery-titles row py-2 flex flex-center align-center bg-black text-white'>
                    <div className="col"><h6>Breweries</h6></div>
                    <div className="col"><h6>Beer Name</h6></div>
                    <div className="col"><span>Alcohol Content</span></div>
                    <div className="col">Price</div>
                    <div className="col">#</div>
                </div>
                <div className="row">
                    {breweryElements}
                </div>
            </div>
        </div>
    )
}

export default BreweriesPage;
