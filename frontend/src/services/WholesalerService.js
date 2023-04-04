import ServiceProvider from "../providers/ServiceProvider";

/**
 * A class representing a service for interacting with wholesalers.
 * @class
 **/
class WholesalerService {
  constructor() {
    this.service = new ServiceProvider();
  }

  async getWholesaler(id) {
    return await this.service.get("wholesalers", id);
  }

  async getAllWholesalers() {
    return await this.service.getAll("wholesalers");
  }

  async addWholesaler(data) {
    return await this.service.post("wholesalers", data);
  }

  async updateWholesaler(id, data) {
    return await this.service.update("wholesalers", id, data);
  }

  async deleteWholesaler(id) {
    return await this.service.delete("wholesalers", id);
  }

  async getWholesalersTheirStocks() {
    return await this.getWholesalersWith("wholesalers", "stocks", "products");
  }

  // url = wholesalers/${id}/products
  async getWholesalerItsProducts(id) {
    return await this.getWholesalersWith("wholesalers", id, "products");
  }

  async getWholesalersWith(...args) {
    const url = args.join("/", args);
    return await this.service.getAll(url);
  }
}

export default WholesalerService;
