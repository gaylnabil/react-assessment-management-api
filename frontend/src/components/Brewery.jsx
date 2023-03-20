import React from 'react'
import Beer from './beers/Beer'

function Brewery(props) {
    const beerElements = props.beers.map((beer) => (

        <Beer key={beer.id} beer={beer} deleteBeer={props.deleteBeer} onSelectBeer={props.onSelectBeer} />

    ));
    console.log("props.beers:", props.beers);
    return (
        <div>
            <div className='row py-1'>
                <div className="col border border-primary text-white brewery-content"><h6>{props.name}</h6></div>
            </div>
            {beerElements}

        </div>
    )
}

export default Brewery
