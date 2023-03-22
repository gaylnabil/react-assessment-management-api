import React from "react";
import { useParams, useLocation } from "react-router";

import FormWholesaler from "../components/wholesalers/FormWholesaler";
import WholesalerService from './../services/WholesalerService';


function WholesalersCreatePage() {

  const wholesalerService = new WholesalerService();

  const { id } = useParams();
  const { state } = useLocation();

  // console.log("🚀 ~ file: WholesalersCreatePage.jsx:27 ~ WholesalersCreatePage ~ beer:", beer);
  // console.log("🚀 ~ file: WholesalersCreatePage.jsx:28 ~ WholesalersCreatePage ~ Id:", id);

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
