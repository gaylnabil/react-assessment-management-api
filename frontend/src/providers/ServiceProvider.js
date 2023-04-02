import api from "../apis/api";

/**
 * A class that provides methods to perform CRUD operations on an API.
 */

class ServiceProvider {
  /**
   * Retrieves data from the specified URL. If an ID is provided, retrieves data for that specific ID.
   *
   * @param {string} url - The URL to retrieve data from.
   * @param {number|null} id - The optional ID of the resource to retrieve.
   * @returns {Promise<any>} - A Promise that resolves with the retrieved data or rejects with an error object.
   */

  async get(url, id = null) {
    const path = id ? `${url}/${id}` : url;
    try {
      const response = await api.get(path);
      return await response.data;
    } catch (error) {
      console.error(`Errors Get Data List (${path}):`, error);
      return error;
    }
  }

  /**
   * Retrieves all data from the specified URL using the `get` method internally.
   *
   * @param {string} url - The URL to retrieve all data from.
   * @returns {Promise<any>} - A Promise that resolves with all retrieved data or rejects with an error object.
   **/
  async getAll(url) {
    return await this.get(url);
  }

  /**
   * Sends a POST request containing JSON-encoded `data` to the specified `url`.
   *
   * Returns a promise resolving into response if successful and rejecting otherwise.
   *
   * Logs any errors encountered during this process.
   *
   * Parameters:
   *    url (str): Target endpoint
   *    data (dict): Data payload
   *
   * Returns:
   *    Response: HTTP response object
   **/

  async post(url, data) {
    try {
      const response = await api.post(url, JSON.stringify(data));

      return response;
    } catch (error) {
      console.error(`Errors Post Request (${url}):`, error);
      return error;
    }
  }

  /**
   * Updates existing resource at given endpoint by sending PUT request containing JSON-encoded 'data'
   *
   * Parameters:
   *       url(str): target endpoint
   *       id(int/str): unique identifier of resource being updated
   *       date(dict): new values replacing old ones in database record
   *
   * Returns:
   *       Response: HTTP response object
   **/

  async update(url, id, data) {
    const path = `${url}/${id}`;
    try {
      const response = await api.put(path, JSON.stringify(data));
      return response;
    } catch (error) {
      console.error(`Errors Update Request (${path}):`, error);
      return error;
    }
  }

  /**
   * Deletes existing resources at given endpoint by sending DELETE request containing JSON-encoded 'data'
   * Parameters:
   *    url(str): target endpoint
   *     id(int/str): unique identifier of resource being deleted
   * Returns:
   *    Response: HTTP response object
   *
   **/

  async delete(url, id = null) {
    const path = id ? `${url}/${id}` : url;
    try {
      const response = await api.delete(path);
      return response;
    } catch (error) {
      console.error(`Errors Delete Request (${path}):`, error);
      return error;
    }
  }

  /**
   * Deletes all resources at given endpoint by sending DELETE request containing JSON-encoded 'data'
   * Parameters:
   *    url(str): target endpoint
   * Returns:
   *    Response: HTTP response object
   **/
  async deleteAll(url) {
    return await this.delete(url);
  }
}

export default ServiceProvider;
