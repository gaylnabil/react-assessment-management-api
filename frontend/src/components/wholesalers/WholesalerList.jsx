import React, { useEffect, useState } from "react";
import api from "../../apis/api";
import Wholesaler from "./Wholesaler";

function WholesalerList() {
  const [ wholesalerList, setWholesalerList ] = useState([]);

  const getWholesalers = async () => {
    const response = await api.get("wholesalers/stocks/beers");
    const data = response.data;

    console.log("getWholesalerList:", data);

    setWholesalerList(data);
  };

  useEffect(() => {
    getWholesalers();
  }, []);

  const wholeElements = wholesalerList.map((wholesaler, index) => {
    console.log(
      "🚀 ~ file: WholesalerList.jsx:25 ~ wholeElements ~ wholesaler:",
      wholesaler
    );

    return <Wholesaler key={index} wholesaler={wholesaler} />
  });

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th className="w-25" scope="col">
              Name
            </th>
            <th colSpan="2" scope="col">
              wholesaler's Stock
            </th>
            <th scope="col">&nbsp;</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>{wholeElements}</tbody>
      </table>
    </div>
  );
}

export default WholesalerList;
