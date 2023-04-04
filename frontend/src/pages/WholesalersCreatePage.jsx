import React from "react";
import { useParams, useLocation } from "react-router";

import FormWholesaler from "../components/wholesalers/FormWholesaler";
import WholesalerService from './../services/WholesalerService';


function WholesalersCreatePage() {

  const wholesalerService = new WholesalerService();

  const { id } = useParams();
  const { state } = useLocation();

  return (
    <div>
      <h1>{id}</h1>

      <FormWholesaler
        isEditing={state.isEditing}
        wholesalerId={id}
        wholesalerService={wholesalerService}
      />
    </div>
  );
}

export default WholesalersCreatePage;
