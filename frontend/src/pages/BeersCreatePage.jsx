import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import FormBeer from "../components/beers/FormBeer";
import BeerService from './../services/BeerService';
function BeersCreatePage() {
  const beerService = new BeerService();
  const [ isEditing, setIsEditing ] = useState(false);
  const { id } = useParams();

  // Sets the isEditing flag to true if there is an ID associated with this Beer
  useEffect(() => {
    setIsEditing(id !== undefined);
  }, [ id, isEditing ])
  // console.log("🚀 ~ file: BeersCreatePage.jsx:27 ~ BeersCreatePage ~ beer:", beer);
  // console.log("🚀 ~ file: BeersCreatePage.jsx:28 ~ BeersCreatePage ~ Id:", id);

  return (
    <div>
      <h1>{id}</h1>
      <FormBeer isEditing={isEditing} beerId={id} beerService={beerService} />
    </div>
  );
}

export default BeersCreatePage;
