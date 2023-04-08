import axios from "axios";

/**
 * Creates an instance of Axios with a base URL and headers set to JSON.
 * @date 4/8/2023 - 2:08:00 PM
 * @type {*}
 */
const api = axios.create({
  baseURL: `https://localhost:7146/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
