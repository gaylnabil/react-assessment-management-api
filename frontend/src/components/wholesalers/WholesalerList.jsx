import React, { useEffect, useState } from "react";
import Wholesaler from "./Wholesaler";
//import WholesalerService from "./../../services/WholesalerService";
function WholesalerList(props) {
  const [ wholesalerList, setWholesalerList ] = useState([]);



  useEffect(() => {
    const getWholesalers = async () => {
      // url = "wholesalers/stocks/beers";
      const data = await props.wholesalerService.getWholesalersTheirStocks();
      setWholesalerList(data);
    };
    getWholesalers();
  }, [ props.wholesalerService ]);

  const wholeElements = wholesalerList.map((wholesaler, index) => {
    // console.log(
    //   "🚀 ~ file: WholesalerList.jsx:25 ~ wholeElements ~ wholesaler:",
    //   wholesaler
    // );

    return <Wholesaler key={index} wholesaler={wholesaler} wholesalerService={props.wholesalerService} />
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
