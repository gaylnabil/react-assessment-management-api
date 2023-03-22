import api from "../apis/api";

class ServiceProvider {
  /**
   *
   * @param {*} url
   * @param {*} id
   * @returns
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

  async getAll(url) {
    return await this.get(url);
  }

  async post(url, data) {
    try {
      const response = await api.post(url, JSON.stringify(data));

      return response;
    } catch (error) {
      console.error(`Errors Post Request (${url}):`, error);
      return error;
    }
  }

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
  async deleteAll(url) {
    return await this.delete(url);
  }
}

export default ServiceProvider;
