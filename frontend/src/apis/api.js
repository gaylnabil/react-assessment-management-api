import axios from "axios";

const api = axios.create({
  baseURL: `https://localhost:7146/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

const getWholesalers = async () => {
  try {
    const response = await api.get("wholesalers");
    // console.log(response);
    return await response.data;
  } catch (error) {
    console.error("Errors Get wholesalers:", error);
    return error;
  }
};

const getWholesalersTheirStocks = async () => {
  try {
    const data = await getDataList("wholesalers/stocks/beers");
    // console.log(response);
    return data;
  } catch (error) {
    console.error("Errors Get wholesalers/stocks/beers:", error);
    return error;
  }
};

const getOrdersWithWholesalersAndBeers = async () => {
  try {
    const data = await getDataList("orders/wholesalers/beers");
    return data;
  } catch (error) {
    console.error("Errors Get Orders:", error);
    return error;
  }
};

const getWholesalerItsBeers = async (id) => {
  try {
    const data = await getDataList(`wholesalers/${id}/beers`);
    return data;
  } catch (error) {
    console.error(`Errors getWholesalerItsBeers (${id}):`, error);
    return error;
  }
};

const getDataList = async (url) => {
  try {
    const response = await api.get(url);
    return await response.data;
  } catch (error) {
    console.error(`Errors getDataList (${url}):`, error);
    return error;
  }
};

const getDataSingle = async (url, id) => {
  try {
    const response = await getDataList(`${url}/${id}`);
    return await response.data;
  } catch (error) {
    console.error(`Errors getDataSingle (${url}/${id})`, error);
    return error;
  }
};

const getStockByWholesalerAndBeer = async (wId, bId) => {
  try {
    const data = await getDataList(`stocks/wholesaler/${wId}/beer/${bId}`);
    return data;
  } catch (error) {
    console.error(
      `Errors getDataSingle getStockByWholesalerAndBeer (${wId}, ${bId}):`,
      error
    );
    return error;
  }
};

/**
 *
 * @param {*} url
 * @param {*} formData
 * @returns
 */
const postRequest = async (url, formData) => {
  try {
    const response = await api.post(url, JSON.stringify(formData), {});

    return response;
  } catch (error) {
    console.error(`Errors postRequest (${url}):`, error);
    return error;
  }
};

const updateRequest = async (url, id, formData) => {
  try {
    const response = await api.put(`${url}/${id}`, JSON.stringify(formData));
    return response;
  } catch (error) {
    console.error(`Errors updateRequest (${url}/${id}):`, error);
    return error;
  }
};
const deleteRequest = async (beerId) => {
  try {
    const response = await api.delete(`beers/${beerId}`);
    return response;
  } catch (error) {
    console.error(`Errors deleteRequest (${beerId}):`, error);
    return error;
  }
};

export default api;
export {
  getWholesalersTheirStocks,
  getOrdersWithWholesalersAndBeers,
  getWholesalerItsBeers,
  getWholesalers,
  getDataList,
  getDataSingle,
  getStockByWholesalerAndBeer,
  postRequest,
  updateRequest,
  deleteRequest,
};
