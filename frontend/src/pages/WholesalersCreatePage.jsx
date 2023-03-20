import React from "react";
import { useParams, useLocation } from "react-router";

import FormWholesaler from "../components/wholesalers/FormWholesaler";
// import api from "../apis/api";

function WholesalersCreatePage() {
  // const [beer, setBeer] = useState({});
  const { id } = useParams();
  const { state } = useLocation();

  // console.log("🚀 ~ file: WholesalersCreatePage.jsx:27 ~ WholesalersCreatePage ~ beer:", beer);
  // console.log("🚀 ~ file: WholesalersCreatePage.jsx:28 ~ WholesalersCreatePage ~ Id:", id);

  return (
    <div>
      <h1>{id}</h1>

      <FormWholesaler isEditing={state.isEditing} wholesalerId={id} />
    </div>
  );
}

export default WholesalersCreatePage;
